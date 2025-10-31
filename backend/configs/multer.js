// import multer from "multer";

// export const upload = multer({storage:multer.diskStorage({})})




// configs/multer.js
// backend/configs/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary configuration (uses your existing .env values)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Define Cloudinary storage for uploads
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "upahar_uploads", // Cloud folder name
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

// ✅ Export multer upload instance
export const upload = multer({ storage });
