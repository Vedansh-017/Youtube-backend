import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    console.log('File uploaded successfully:', response.secure_url);

    // Delete local file after upload
    await fs.promises.unlink(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Attempt cleanup
    try {
      await fs.promises.unlink(localFilePath);
    } catch (unlinkErr) {
      console.error("Failed to delete local file:", unlinkErr);
    }

    return null;
  }
};

export { uploadOnCloudinary };
