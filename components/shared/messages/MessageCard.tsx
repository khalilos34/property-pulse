"use client";

import { deleteMessage, readMessages } from "@/lib/actions/message.action";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }: { message: any }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [loading, setIsloading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const messageId = message._id;
  const handleMessage = async () => {
    const message = await readMessages(messageId);
    if (message.read) {
      toast.success("Marked as read");
    } else {
      toast.success("Marked as New");
    }
    setIsRead(!isRead);
  };
  const deleteMessages = async () => {
    setIsloading(true);
    const response = await deleteMessage(messageId);
    if (response.success) {
      toast.success("Message deleted successfully");
      setIsDeleted(true);
    } else {
      toast.error("Failed to delete message");
    }
    setIsloading(false);
  };
  if (isDeleted) return null;
  return (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-md shadow-lg border border-gray-200">
        {!isRead && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
            New
          </div>
        )}
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry:{message.isRead}</span>
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name:</strong> {message.sender.first_name}{" "}
            {message.sender.last_name}
          </li>

          <li>
            <strong>Reply Email:</strong>
            <a href="mailto:recipient@example.com" className="text-blue-500">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Reply Phone:</strong>
            <a href="tel:123-456-7890" className="text-blue-500">
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Received:</strong>
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
        <button
          onClick={handleMessage}
          className={`mt-4 mr-3 ${
            isRead ? "bg-gray-300" : "bg-blue-500 text-white"
          }  py-1 px-3 rounded-md`}
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>
        <button
          disabled={loading}
          onClick={deleteMessages}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
