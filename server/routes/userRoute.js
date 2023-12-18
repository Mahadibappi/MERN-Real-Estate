import express from "express";
import {
  login,
  updateUser,
  deleteUser,
  signOut,
  getUser,
} from "../controller/userController.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();
router.get("/login", login);
router.post("/update/:id", updateUser);
router.get("/signuot", signOut);
router.delete("/delete/:id", deleteUser);
router.get("/:id", getUser);
export default router;
