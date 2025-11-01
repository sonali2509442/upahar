

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },

      soldCount: { type: Number, default: 0 },
  isBestseller: { type: Boolean, default: false }, // <--- add this

  },
  { timestamps: true }
);

productSchema.index({ soldCount: -1 });
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
