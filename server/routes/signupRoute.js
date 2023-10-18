import express from "express";
import { singUp } from "../controller/signupController.js";
const router = express.Router();
router.post("/signup", singUp);

export default router;
