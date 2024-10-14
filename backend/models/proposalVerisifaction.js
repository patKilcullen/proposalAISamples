import mongoose, { Schema } from "mongoose";

const proposalVerificationSchema = Schema({
  proposalId: String,
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

const ProposalVerification = mongoose.model("ProposalVerification", proposalVerificationSchema);

export default ProposalVerification;