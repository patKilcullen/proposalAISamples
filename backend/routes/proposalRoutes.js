import express from "express";
import {
  getBusinessProposals,
  createProposal,
  deleteProposal,
  generateWithPrompt,
  updateSelectedPara,
  getProposal,
  saveProposalPDF,
  // sendProposalLink,
  sendProposalPDF,
  // attachProposalToClient,
  updateExistingProposalVersion,
  updateProposal,
  updateExistingProposalVersion2,
  getClientProposals,
  createProposalTest,
  getUserProposals,
  addBusinessCollaborator,
  // sendProposalInvite,
  addBusinessApprover,
  addClientCollaborator,
  addClientApprover,
  verifyProposal,
  deleteBusinessCollaborator,
  deleteBusinessApprover,
  deleteClientCollaborator,
  deleteClientApprover,
} from "../controllers/proposalController.js";
import { sendProposalLink, sendProposalInvite } from "../utils/sendEmail.js";

import { sendOtp, verifyOtp } from "../controllers/authController.js";

import { userAuth } from "../middleware/authMiddleware.js";
import { proposalAuthorization } from "../middleware/proposalMiddleware.js";

const router = express.Router();

//CREATE
router.post("/create-proposal", userAuth, createProposal);
router.post("/prompt", generateWithPrompt);
router.post("/update-para", updateSelectedPara);
// TEST CREATE PROPOSAL
router.post("/create-proposal-test", userAuth, createProposalTest);
//GET
router.get("/get-user-proposals/:id", userAuth, getUserProposals);
router.get("/get-business-proposals/:bid", userAuth, getBusinessProposals);
router.get("/:pid", userAuth, proposalAuthorization, getProposal);
router.get("/get-client-proposals/:id", userAuth, getClientProposals);

// UPDATE
router.patch("/update-version/:id", userAuth, updateExistingProposalVersion);
router.patch("/update-version2/:id", userAuth, updateExistingProposalVersion2);
router.patch("/update/:id", userAuth, updateProposal);
router.patch(
  "/add-business-collaborator/:pid",
  userAuth,
  addBusinessCollaborator
);
router.patch("/add-business-approver/:pid", userAuth, addBusinessApprover);
router.patch("/add-client-collaborator/:pid", userAuth, addClientCollaborator);
router.patch("/add-client-approver/:pid", userAuth, addClientApprover);

router.patch(
  "/delete-business-collaborator/:pid",
  userAuth,
  deleteBusinessCollaborator
);
router.patch(
  "/delete-business-approver/:pid",
  userAuth,
  deleteBusinessApprover
);
router.patch(
  "/delete-client-collaborator/:pid",
  userAuth,
  deleteClientCollaborator
);
router.patch("/delete-client-approver/:pid", userAuth, deleteClientApprover);

// ONE TIME PASSWORD
router.post("/send-otp", userAuth, sendOtp);
router.post("/verify-otp", userAuth, verifyOtp);

//DELETE
router.delete("/:id", userAuth, deleteProposal);

// SEND PROPOSAL
router.post("/send-link", userAuth, sendProposalLink);
router.post("/send-invite", userAuth, sendProposalInvite);
router.post("/save-pdf/:id", userAuth, saveProposalPDF);
router.post("/send-pdf", userAuth, sendProposalPDF);
router.post("/verify-proposal", verifyProposal);

export default router;
