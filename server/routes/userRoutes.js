import express from "express";
import {
  getUser,
  updateUser,
  requestPasswordReset,
  resetPassword,
  changePassword,
  verifyEmail,
  deleteUser,
  getUserContacts,
  addContacts,
  addProposal,
  
} from "../controllers/userController.js";
import {
  resendVerifyEmail,} from "../controllers/authController.js";
// UPDATED
import { sendVerificationEmail, sendSupportMessage } from "../utils/sendEmail.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

//EMAIL VERIFICATION
router.get("/verify/:userId/:token", verifyEmail);
router.get("/verified", (req, res) => {
  const { message } = req.query;
  res.json({ message: message });
});
router.post("/send-email-verification", resendVerifyEmail);

// user routes
router.get("/get/:id", getUser);
router.put("/update-user/:id", userAuth, updateUser);
router.get("/get/:id/contacts", userAuth, getUserContacts);
router.put("/add-contacts", userAuth, addContacts);
// ROLE IN PROPOSAL
router.put("/add-proposal", userAuth, addProposal);

// DELETE
router.delete("/:id", deleteUser);

// PASSWORD RESET
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password/:id", changePassword);
router.get("/resetpassword");

router.post("/send-support-message", userAuth, sendSupportMessage);

export default router;
