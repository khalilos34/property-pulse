"use server";

import { getUser } from "./user.actions";
import connectDB from "@/config/database";
import { Message } from "../models/message";
import { revalidatePath } from "next/cache";

export const fetchMessageByUser = async () => {
  try {
    await connectDB();
    const user = await getUser();
    if (!user) return new Response("user not found");
    const readMessages = await Message.find({
      recipient: user?._id,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("property", "name")
      .populate("sender", "first_name last_name");
    const NewMessages = await Message.find({
      recipient: user?._id,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("property", "name")
      .populate("sender", "first_name last_name");

    const messages = [...NewMessages, ...readMessages];
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.log(error);
  }
};

export const readMessages = async (messageId: string) => {
  try {
    await connectDB();
    const message = await Message.findById(messageId);
    if (!message) return new Response("message not found");
    message.read = !message.read;
    await message.save();
    revalidatePath("/messages");
    return JSON.parse(JSON.stringify(message));
  } catch (error) {
    console.log(error);
  }
};
export const deleteMessage = async (messageId: string) => {
  try {
    await connectDB();
    const message = await Message.findById(messageId);
    if (!message) return { error: "message not found" };
    await message.deleteOne();
    return { success: "message deleted" };
  } catch (error) {
    console.log(error);
    return { error: "an error occurred" };
  }
};
export const countUnreadMessages = async () => {
  try {
    await connectDB();
    const user = await getUser();
    if (!user) return new Response("user not found");
    const count = await Message.countDocuments({
      recipient: user?._id,
      read: false,
    });
    return JSON.parse(JSON.stringify(count));
  } catch (error) {
    console.log(error);
  }
};
