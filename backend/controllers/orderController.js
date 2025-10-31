// controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import generateQRCode from "../utils/generateQRCode.js";
import Stripe from "stripe";
import User from "../models/User.js";

// Place Order COD
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!userId) return res.status(401).json({ success: false, message: "User not logged in" });
    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ success: false, message: `Product not found: ${item.product}` });

      let productTotal = (product.offerPrice || 0) * item.quantity;
      let qrData = null;

      if (item.qrSelected) {
        const extraCharge = 50 * item.quantity;
        productTotal += extraCharge;
        qrData = await generateQRCode(`Product:${product._id} User:${userId} Time:${Date.now()}`);
      }

      totalAmount += productTotal;

      orderItems.push({
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity,
        qrCode: qrData,
      });
    }

    // Add 2% tax
    totalAmount = Math.round(totalAmount * 1.02);

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      items: orderItems,
      amount: totalAmount,
      address: address,
      paymentType: "COD",
      isPaid: false,
    });

    // Increase soldCount for products
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { soldCount: item.quantity } });
    }

    res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error("placeOrderCOD error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place Order (Stripe)
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!userId) return res.status(401).json({ success: false, message: "User not logged in" });
    if (!address || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    let productData = [];
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ success: false, message: `Product not found: ${item.product}` });

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      let productTotal = (product.offerPrice || 0) * item.quantity;
      let qrData = null;

      if (item.qrSelected) {
        const extraCharge = 50 * item.quantity;
        productTotal += extraCharge;
        qrData = await generateQRCode(`Product:${product._id} User:${userId} Time:${Date.now()}`);
      }

      totalAmount += productTotal;

      orderItems.push({
        product: new mongoose.Types.ObjectId(item.product),
        quantity: item.quantity,
        qrCode: qrData,
      });
    }

    // Add 2% tax
    totalAmount = Math.round(totalAmount * 1.02);

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      items: orderItems,
      amount: totalAmount,
      address: address,
      paymentType: "Online",
      isPaid: false,
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRETKEY);

    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.floor((item.price + item.price * 0.02) * 100), // cents
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("placeOrderStripe error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe Webhooks (must receive raw body via express.raw on the route)
export const stripeWebhooks = async (req, res) => {
  try {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRETKEY);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
      // for checkout sessions we can fetch metadata via session object
      const paymentIntent = event.data.object;
      // get session by payment_intent (safest)
      const sessionList = await stripeInstance.checkout.sessions.list({ payment_intent: paymentIntent.id });
      const session = sessionList.data && sessionList.data[0];
      if (session && session.metadata) {
        const { orderId, userId } = session.metadata;
        // mark paid
        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        // update soldCount
        const paidOrder = await Order.findById(orderId);
        if (paidOrder) {
          for (const item of paidOrder.items) {
            await Product.findByIdAndUpdate(item.product, { $inc: { soldCount: item.quantity } });
          }
        }
        // clear user cart
        await User.findByIdAndUpdate(userId, { cartItems: {} });
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("stripeWebhooks error:", err);
    res.status(500).send("Webhook handler error");
  }
};

// Get orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ success: false, message: "User not logged in" });

    const orders = await Order.find({ userId: req.userId })
      .populate({ path: "items.product", select: "name images category offerPrice" })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("getUserOrders error:", error);
    res.status(500).json({ success: false, message: error.message || "Error fetching user orders" });
  }
};

// Get all orders (admin/seller)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ $or: [{ paymentType: "COD" }, { isPaid: true }] })
      .populate({ path: "items.product", select: "name images category offerPrice" })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get seller-specific orders
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.seller?._id;
    if (!sellerId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const sellerProducts = await Product.find({ seller: sellerId }).select("_id");
    const sellerProductIds = sellerProducts.map((p) => p._id);

    const orders = await Order.find({ "items.product": { $in: sellerProductIds } })
      .populate({ path: "items.product", select: "name images category offerPrice seller" })
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("getSellerOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

