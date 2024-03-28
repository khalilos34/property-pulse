import connectDB from "@/config/database";
import Property, { IProperty } from "../models/property";
import { auth } from "@clerk/nextjs";

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

export const createProperty = async () => {
  const { userId } = auth();
  return userId;
};
