import mongoose, { Schema } from "mongoose";

const proposalSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business",
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  businessCollaborators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  businessApprovers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  clientCollaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  clientApprovers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: {
    type: String,
    enum: [
      "draft",
      "sent",
      "clientSigned",
      "signed",
      "rejected",
      "in-revision",
      "returned",
      "returned-revision",
    ],
  },
  businessSignerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clientSignerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clientSignature: {
    type: String,
  },
  businessSignature: {
    type: String,
  },
  version: [
    {
      creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
      },
      versionNumber: {
        type: Number,
      },
      updatedAt: { type: Date, default: Date.now() },
    },
  ],
  proposalUrl: {
    type: String,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now() },
  metadata: {
    businessInfo: {
      businessName: {
        type: String,
      },
      businessOverview: {
        type: String,
      },
      businessContact: {
        type: String,
      },
      businessEmail: {
        type: String,
      },
      businessAddress: {
        type: String,
      },
      businessUrl: {
        type: String,
      },
    },

    clientInfo: {
      clientName: {
        type: String,
      },
      clientEmail: {
        type: String,
      },
      clientAddress: {
        type: String,
      },
      clientBusinessOverview: {
        type: String,
      },
      clientBusinessServices: {
        type: String,
      },
      clientUrl: {
        type: String,
      },
      clientRepName: {
        type: String,
      },
      clientRepRole: {
        type: String,
      },
      clientRepEmail: {
        type: String,
      },
    },

    proposalInfo: {
      scopeOfWork: {
        type: String,
      },
      previousSuccessStory: {
        type: String,
      },
      clientGoal: {
        type: String,
      },
      projectTimeline: {
        type: String,
      },
      budgetAndPricing: {
        type: String,
      },
      deliverables: {
        type: String,
      },
      uniqueSellingPosition: {
        type: String,
      },
      termsAndConditions: {
        type: String,
      },
      clientResponsibilities: {
        type: String,
      },
    },
  },
});

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;
