import express from "express";
import {
  getAllBusiness,
  createBusiness,
  updateBusiness,
  getBusiness,
  getBusinessUsers,
  joinBusiness,
  removeBusinessUser,
} from "../controllers/businessController.js";
import { userAuth } from "../middleware/authMiddleware.js";

import { upload } from "../middleware/imageSaveMiddleware.js";

const router = express.Router();

// CREATE
router.post("/create", userAuth, createBusiness);
router.post("/join/:id", userAuth, joinBusiness);

// GET
router.get("/", getAllBusiness);
router.get("/:id", getBusiness);
router.get("/:id/users", getBusinessUsers);

// UPDATE
router.put("/update/:id", userAuth, updateBusiness);

// DELETE
router.delete("/remove/:id/user", userAuth, removeBusinessUser);

export default router;
