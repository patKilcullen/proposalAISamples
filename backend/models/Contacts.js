import mongoose, { Schema } from "mongoose";

const contactsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Contacts", contactsSchema);
