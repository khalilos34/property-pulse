import cloudinary from "@/config/cloudinary";

export const imageConverter = async (images: any[]) => {
  const imageUploadPromise = [];
  for (const image of images) {
    const imageBuffer = image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString("base64");
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "PROPERTY_PULSE",
      }
    );
    imageUploadPromise.push(result.secure_url);
  }
  const uploadedImages = await Promise.all(imageUploadPromise);
  return uploadedImages;
};
