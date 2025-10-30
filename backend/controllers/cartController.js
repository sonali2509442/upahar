
import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems) {
      return res.status(400).json({ success: false, message: "Cart items missing" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { cartItems },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartItems: user.cartItems
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

