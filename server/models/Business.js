import mongoose from "mongoose";
import { isValidURL } from "../utils/index.js";

const businessSchema = new mongoose.Schema({
  onboardingComplete: {
    type: Boolean,
    default: false,
  },
  businessType: {
    type: String,
  },
  businessName: {
    type: String,
    required: true,
  },

  logo: {
    type: String, 
    required: false,
  },
  tin: {
    type: String, 
    required: false,
  },

  signedTerms: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  contactPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gst: {
    type: Number,
  },
  industry: {
    type: String,
  },
  businessOverview: {
    type: String,
  },
  businessServices: {
    type: String,
  },
  url: {
    type: String,
    validate: {
      validator: function (value) {
        return isValidURL(value);
      },
      message: "Invalid URL format",
    },
  },

  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  proposals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proposal" }],

  businessRepName: {
    type: String,
  },
  businessRepRole: {
    type: String,
  },
  businessRepEmail: {
    type: String,
  },
});

export default mongoose.model("Business", businessSchema);
