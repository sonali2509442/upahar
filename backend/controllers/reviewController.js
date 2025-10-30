// controllers/reviewController.js
import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js"; // if you need to mark item rated

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment, orderId, orderItemIndex } = req.body;
    const userId = req.userId; // assume auth middleware sets req.userId

    // prevent duplicate review by same user for same order item (optional)
    const existing = await Review.findOne({ productId, userId });
    if (existing && orderId == null) {
      // if you want to restrict 1 review ever per product per user:
      return res.status(400).json({ success: false, message: "You already reviewed this product." });
    }

    const review = await Review.create({ productId, userId, rating, comment });

    // Update product average rating (simple recompute)
    const reviews = await Review.find({ productId });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(productId, { averageRating: avg });

    // Optionally: mark order item as rated so user can't rate same order item again
    if (orderId && typeof orderItemIndex === "number") {
      await Order.updateOne(
        { _id: orderId, "items._id": req.body.orderItemId },
        { $set: { "items.$.rated": true } }
      ).catch(() => {});
    }

    return res.json({ success: true, review });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ productId }).populate("userId", "name");
    return res.json({ success: true, reviews });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
