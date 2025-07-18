import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongoURI, {});
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToDB;
