import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reminderRouter from "./routes/reminderRoutes.js";
import giftReminderRoutes from "./routes/giftReminderRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();

// ✅ Enable cookies before anything else
app.use(cookieParser());

// ✅ Trust proxy (for secure cookies on Render/Vercel)
app.set("trust proxy", 1);

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

// ✅ Stripe webhook (must be before express.json)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// ✅ CORS configuration
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
    credentials: true, // 🔥 allows cookies to be sent
  })
);

// ✅ JSON middleware
app.use(express.json({ limit: "10mb" }));

// ✅ Session middleware (after cookieParser)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production
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

// ✅ Error handler
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

