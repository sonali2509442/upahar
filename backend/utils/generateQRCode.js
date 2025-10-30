import QRCode from "qrcode";

export const generateQRCode = async (data) => {
  try {
    const qrImage = await QRCode.toDataURL(data);
    return qrImage;
  } catch (error) {
    console.error("QR Code generation failed:", error);
    throw new Error("Could not generate QR code");
  }
};

export default generateQRCode;
