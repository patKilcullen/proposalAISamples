import mongoose from "mongoose";
import { isValidPassword } from "../utils/index.js";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },

  googleId: { type: String },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business"},
  role: {
    type: String,
    enum: ["client", "admin"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  profileUrl: {
    type: String,
  },

  email: {
    type: String,
    required: [true, " Email is Required!"],
    unique: true,
  },

  password: {
    type: String,
    required: [
      function () {
        return !this.googleId;
      },
      "Password is required for non-Google accounts",
    ],
    validate: {
      validator: function (value) {
        return isValidPassword(value);
      },
      message:
        "Password should be at least 8 characters, including upper and lower letter, number and ",
    },
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contacts" }],

  proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],
});

export default mongoose.model("User", userSchema);
