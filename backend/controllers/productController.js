

import path from 'path';
import fs from 'fs';
import Product from "../models/product.js";
import { cloudinary } from "../configs/cloudinary.js";


// Add product — expects authSeller ran earlier so req.seller exists
export const addProduct = async (req, res) => {
  try {
    const seller = req.seller || (req.session && req.session.sellerId);
    if (!seller) {
      return res.status(401).json({ success: false, message: 'Not authenticated as seller' });
    }

    const productData = req.body.productData ? JSON.parse(req.body.productData) : {};

      const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "upahar_products",
        });
        images.push(result.secure_url);
      }
    }

    const newProduct = await Product.create({
      ...productData,
      images,
      seller: seller._id || seller
    });

    return res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (err) {
    console.error('addProduct error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products (public)
export const productList = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change stock (protected)
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({ success: true, message: 'Stock updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get products for the logged-in seller
// ✅ Get top-selling products (Bestsellers)
export const getBestsellers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    // find only valid products with soldCount >= 0 and inStock true
    const products = await Product.find({
      inStock: true,
      soldCount: { $gte: 0 },
    })
      .sort({ soldCount: -1 })
      .limit(limit)
      .select("name price offerPrice images soldCount category") // limit fields
      .lean();

    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bestsellers found",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bestsellers fetched successfully",
      products,
    });
  } catch (err) {
    console.error("🔥 getBestsellers error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Backend error: could not load products",
      error: err.message,
    });
  }
};


// Delete product (protected)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get top-selling products (Bestsellers)
export const getBestsellers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const products = await Product.find({ inStock: true })
      .sort({ soldCount: -1 })
      .limit(limit)
      .lean();
    return res.json({ success: true, products });
  } catch (err) {
    console.error('getBestsellers error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
