import express from "express";
import { login, updateUser, deleteUser } from "../controller/userController.js";
import { verifyToken } from "../utils/VerifyUser.js";
const router = express.Router();
router.get("/login", login);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
