import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFileOnCloud = async (localFilePath) => {
  try {
    //  console.log("this is localfilepath", localFilePath);
    if (!localFilePath) return null;
    const cloudResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    // console.log(`File uploaded successfully on ${cloudResponse.url}`);
    return cloudResponse;
  } catch (error) {
    //console.log("Error while uploading on cloudinary", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadFileOnCloud };
