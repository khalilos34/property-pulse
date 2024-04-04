import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";
interface IMessage extends Document {
  property: { name: string };
  sender: { first_name: string; last_name: string };
  recipient: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read?: boolean;
}

const MessageSchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const Message = models.Message || model("Message", MessageSchema);
