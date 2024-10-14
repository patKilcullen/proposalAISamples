import express from "express";
import businessRoutes from "./businessRoutes.js";
import proposalRoutes from "./proposalRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/business", businessRoutes);
router.use("/users", userRoutes);
router.use("/business/proposal", proposalRoutes);

export default router;
