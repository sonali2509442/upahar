
import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
  getProductsBySeller,
  getBestsellers,
} from "../controllers/productController.js";

const productRouter = express.Router();

// 🟢 Public routes
productRouter.get("/list", productList); // get all products
productRouter.get("/product/:id", productById); // get single product
productRouter.get("/bestsellers", getBestsellers); // ✅ fixed route name

// 🟢 Protected (seller-only) routes
productRouter.post("/add", authSeller, upload.array("images"), addProduct);
productRouter.post("/stock", authSeller, changeStock);
productRouter.get("/seller", authSeller, getProductsBySeller);

export default productRouter;
