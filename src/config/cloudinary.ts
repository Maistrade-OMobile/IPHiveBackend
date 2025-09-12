import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import CloudinaryStorage from "multer-storage-cloudinary";
interface Params {
  public_id: (req: Express.Request, file: Express.Multer.File) => string;
  folder: string;
  resource_type: string;
  allowed_formats: string[];
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file: Express.Multer.File) =>
      file.originalname + "-" + Date.now(),
    folder: "iPhive",
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx", "png", "jpg", "jpeg"]
  } as Params
});

const upload = multer({ storage });
// const upload = multer({ dest: "./Uploads" });

export default upload;
