import express from "express";
import {
  register,
  login,
  loginGoogle,
  createUserGoogle,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// google
router.post("/create-google", createUserGoogle);
router.post("/login-google", loginGoogle);

router.get(
  "/google/signup",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

export default router;
