import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";
connectDB();
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";

import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reminderRouter from "./routes/reminderRoutes.js";
import giftReminderRoutes from "./routes/giftReminderRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import cors from "cors";

const app = express();

// ✅ Connect Database + Cloudinary
const initServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log("✅ Database and Cloudinary connected");
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  }
};
initServer();

// ✅ Stripe webhook (before express.json)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// ✅ CORS configuration (robust)
const allowedOrigins = [
  "https://upahar-one.vercel.app", // frontend deployed
  "https://upahar-backend.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Trust proxy for secure cookies (Vercel/Render)
app.set("trust proxy", 1);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));//for bigger json data


// ✅ Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
     secure: process.env.NODE_ENV === "production", // true only online
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Upahar Backend is running successfully!");
});

// ✅ API Routes
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reminders", reminderRouter);
app.use("/api/gift-reminder", giftReminderRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/reviews", reviewRoutes);

// ✅ Error handler (so CORS headers always sent)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
});

export default app;

