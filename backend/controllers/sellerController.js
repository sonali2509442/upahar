



import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

// REGISTER
export const sellerRegister = async (req, res) => {
  try {
    const { name, email, password, shopName, phone, address } = req.body;

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) return res.json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new Seller({ name, email, password: hashedPassword, shopName, phone, address });
    await newSeller.save();

    res.json({ success: true, message: "Seller registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// LOGIN
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller) return res.json({ success: false, message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ sellerId: seller._id, email: seller.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none" ,
      maxAge:  24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CHECK AUTH
export const isSellerauth = async (req, res) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) return res.json({ success: false });

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    const seller = await Seller.findById(decoded.sellerId).select("-password");
    if (!seller) return res.json({ success: false });

    res.json({ success: true, seller });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// LOGOUT
export const sellerlogout = (req, res) => {
  res.clearCookie("sellerToken");
  res.json({ success: true, message: "Seller logged out successfully" });
};
