import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
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
import { stripeWebhooks } from "./controllers/orderController.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// Connect DB + Cloudinary
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

// Stripe webhook (before JSON parser)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// ✅ CORS setup
const allowedOrigins = [
  "https://upahar-one.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.set("trust proxy", 1);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ✅ Routes
app.get("/", (req, res) => res.send("Backend is running on Vercel 🚀"));
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

export default app;
