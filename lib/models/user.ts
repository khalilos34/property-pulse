import { Document, Schema, model, models } from "mongoose";
export interface IUser extends Document {
  username: string;
  clerkId: string;
  email: string;
  photo: string;
  bookmarks: string[];
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  last_name: string;
}

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const User = models.User || model("User", UserSchema);
export default User;
