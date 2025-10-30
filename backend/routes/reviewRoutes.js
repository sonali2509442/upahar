// routes/reviewRoutes.js
import express from "express";
import { addReview, getReviewsByProduct } from "../controllers/reviewController.js";
import authUser from "../middlewares/authUser.js"; // your auth middleware

const router = express.Router();

router.post("/add", authUser, addReview);
router.get("/:productId", getReviewsByProduct);
 

export default router;


