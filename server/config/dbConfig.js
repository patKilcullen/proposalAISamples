import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export default dbConnection;
