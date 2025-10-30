

import Address from "../models/Address.js";

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId; // coming from authUser middleware
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      country,
      zipcode,
      phone
    } = req.body; // receive flat fields

    if (!firstName || !lastName || !email || !street || !city || !state || !country || !zipcode || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newAddress = await Address.create({
      userId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      country,
      zipcode,
      phone
    });

    return res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.log("❌ Error in addAddress:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all addresses of logged-in user
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const addresses = await Address.find({ userId });
    return res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.log("❌ Error in getAddress:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing address
export const updateAddress = async (req, res) => {
  try {
    const { addressId, ...address } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!addressId) return res.status(400).json({ success: false, message: "Missing address ID" });

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { $set: address },
      { new: true }
    );

    if (!updatedAddress) return res.status(404).json({ success: false, message: "Address not found" });

    return res.status(200).json({ success: true, message: "Address updated successfully", address: updatedAddress });
  } catch (error) {
    console.log("❌ Error in updateAddress:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!deletedAddress) return res.status(404).json({ success: false, message: "Address not found" });

    return res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log("❌ Error in deleteAddress:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
