import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connection to database successfully!");
  } catch (error) {
    console.log("Failed: " + error.message);
  }
};

export default connectionDB;
