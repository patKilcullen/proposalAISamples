import mongoose, { Schema } from "mongoose";

const passwordResetSchema = Schema({
  userId: { type: String, unique: true },
  email: { type: String, unique: true },
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

const passwordReset = mongoose.model("passwordReset", passwordResetSchema);

export default passwordReset;