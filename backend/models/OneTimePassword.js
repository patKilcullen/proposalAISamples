import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  otp: String,
  userId: String,
  expirationTime: Date,
});


const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;
