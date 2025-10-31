import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
