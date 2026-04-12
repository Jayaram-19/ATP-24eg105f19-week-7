import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from 'dotenv';
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'blog-app',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      public_id: file.fieldname + '-' + Date.now(),
    };
  },
});

export const upload = multer({ storage: storage });
