import connectDB from "@/config/database";
import User from "../models/user";
import { createUserParams, updateUserParams } from "@/types/type";
import { revalidatePath } from "next/cache";

export const createUser = async (user: createUserParams) => {
  try {
    await connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (userId: string) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (clerkId: string, user: updateUserParams) => {
  try {
    await connectDB();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("user update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (clerkId: string) => {
  try {
    await connectDB();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("user not found");
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.log(error);
  }
};
