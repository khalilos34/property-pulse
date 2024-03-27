import mongoose from "mongoose";
let connected = false;
const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) return console.log("MongoDB is already connected");
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
    connected = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
