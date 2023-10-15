import express from "express";
import { createUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signUp", createUser);

router.get("/login", getUser);
export default router;
