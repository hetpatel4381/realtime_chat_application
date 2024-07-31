import mongoose from "mongoose";
import { config } from "./index.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.mongoURL}/${config.dbName}`
    );

    console.log(
      `MongoDB Connected !! DB HOST: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
