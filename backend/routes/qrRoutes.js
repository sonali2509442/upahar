import express from "express";
import { createCustomQRCode } from "../controllers/qrController.js";
const router = express.Router();

router.post("/generate", createCustomQRCode);

export default router;
