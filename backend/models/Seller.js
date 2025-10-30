


import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String },
  phone: { type: String },
  address: { type: String },
}, { timestamps: true });

export default mongoose.model("Seller", sellerSchema);
