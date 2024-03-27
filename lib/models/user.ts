import { Document, Schema, model, models } from "mongoose";
export interface User extends Document {
  username: string;
  email: string;
  image?: string;
  bookmarks: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
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
