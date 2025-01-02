import supabaseClient from "../config/supabase.config";
import sharp from "sharp";
import dotenv from "dotenv";

dotenv.config();

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || "";

export const uploadFileSupabase = async (
  file: Express.Multer.File,
  name: string,
  type: string
) => {
  try {
    if (!file.buffer) {
      throw new Error("File buffer is missing");
    }
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/tiff",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validMimeTypes.includes(file.mimetype)) {
      throw new Error("Unsupported file type");
    }

    const fileBuffer = await sharp(file.buffer)
      .resize(800, 800, {
        fit: "inside",
      })
      .toFormat("webp")
      .webp({ quality: 80 })
      .toBuffer();

    const fileName = `file/${type}/${name}-${Date.now()}.webp`;

    const { data, error } = await supabaseClient.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }

    const {
      data: { publicUrl: publicURL },
    } = await supabaseClient.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    if (!publicURL) {
      throw new Error("Public URL is missing");
    }

    return { fileName, downloadUrl: publicURL };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
