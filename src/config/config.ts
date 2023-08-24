import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sabiflexhq:sabi123flex@cluster0.urqsyic.mongodb.net/sabiflexdb";
const db = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log("MongoDB connected Successfully");
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};
export default db;
