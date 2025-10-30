
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      quantity: { type: Number, required: true },
      qrCode: { type: String, default: null }, 
    },
  ],
  amount: { type: Number, required: true },
  address: { type: mongoose.Schema.Types.Mixed, required: true }, 
  status: { type: String, default: "Order placed" },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });


const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;



