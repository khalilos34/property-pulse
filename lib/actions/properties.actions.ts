"use server";
import connectDB from "@/config/database";
import Property, { IProperty } from "../models/property";
import { revalidatePath } from "next/cache";

export const fetchAllProperties = async (): Promise<IProperty[]> => {
  await connectDB();
  const properties = await Property.find({});

  return JSON.parse(JSON.stringify(properties));
};

export const fetchPropertyById = async (id: string): Promise<IProperty> => {
  await connectDB();
  const property = await Property.findById(id);
  return JSON.parse(JSON.stringify(property));
};

export const fetchPropertyByUserId = async (
  userId: string
): Promise<IProperty[]> => {
  await connectDB();
  const properties = await Property.find({ owner: userId });

  return JSON.parse(JSON.stringify(properties));
};
export const deleteProperty = async (id: string) => {
  try {
    await connectDB();
    await Property.deleteOne({ _id: id });
    revalidatePath("/profile");
    revalidatePath("/properties");
  } catch (error) {
    console.log(error);
  }
};
export const updateProperty = async (property: IProperty) => {
  try {
    await connectDB();

    const existedProperty = await Property.findById(property._id);
    if (!existedProperty) throw new Error("Property does not exist");
    await Property.findByIdAndUpdate(property._id, property, { new: true });

    revalidatePath("/properties");
  } catch (error) {
    console.log(error);
  }
};
