// scripts/computeSoldCount.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Order from "../models/Order.js";
import Product from "../models/product.js";

const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/upahar";

async function run() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

  // Reset soldCount (optional)
  await Product.updateMany({}, { $set: { soldCount: 0 } });

  // Unwind items and sum quantities per product
  const pipeline = [
    { $unwind: "$items" },
    { $group: { _id: "$items.product", totalSold: { $sum: { $ifNull: ["$items.quantity", 1] } } } }
  ];

  const results = await Order.aggregate(pipeline);

  for (const r of results) {
    if (!r._id) continue;
    await Product.findByIdAndUpdate(r._id, { $set: { soldCount: r.totalSold } });
    console.log(`Updated product ${r._id} -> soldCount=${r.totalSold}`);
  }

  console.log("Migration done");
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
