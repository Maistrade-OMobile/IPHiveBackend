import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import CloudinaryStorage from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = CloudinaryStorage({
  cloudinary: cloudinary
});

const upload = multer({ storage });

export default upload;

// export async function uploadToCloud(file_path, resource_type) {
//   try {
//     const uploadedFile = await cloudinary.uploader.upload(file_path, {
//       resource_type
//     });
//     // console.log("uploadedFile", uploadedFile);
//     return uploadedFile.secure_url;
//   } catch (err) {
//     console.error(err);
//   }
// }
