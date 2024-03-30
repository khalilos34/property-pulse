"use server";
import connectDB from "@/config/database";
import Property, { IProperty } from "../models/property";
import { auth } from "@clerk/nextjs";
import User from "../models/user";
import { revalidatePath } from "next/cache";
import { imageConverter } from "@/utils/imageConverter";
import cloudinary from "@/config/cloudinary";

export const fetchAllProperties = async (): Promise<IProperty[]> => {
  await connectDB();
  const properties = await Property.find({});

  return properties;
};

export const fetchPropertyById = async (id: string): Promise<IProperty> => {
  await connectDB();
  const property = await Property.findById(id);
  return property;
};

export const createNewProperty = async (property: IProperty) => {
  try {
    await connectDB();
    const { userId } = auth();
    if (!userId) {
      throw new Error("Owner not found");
    }
    const owner = await User.findOne({ clerkId: userId });
    property.owner = owner._id;
    const imageUploadPromises = property.images.map(async (image) => {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property_pulse",
        }
      );
      return result.secure_url;
    });
    const uploadedImages = await Promise.all(imageUploadPromises);
    const propertyTo = { ...property, images: uploadedImages };

    const newProperty = await Property.create(propertyTo);
    revalidatePath("/properties/");
    return JSON.stringify(newProperty);
  } catch (error) {
    console.log(error);
  }
};
