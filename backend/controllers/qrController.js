import { generateQRCode } from "../utils/generateQRCode.js";

export const createCustomQRCode = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    const qr = await generateQRCode(content);
    res.json({ qr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "QR generation failed" });
  }
};
