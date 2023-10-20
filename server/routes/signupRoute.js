import express from "express";
import { login, singUp } from "../controller/signupController.js";
const router = express.Router();
router.post("/signup", singUp);
router.post("/signin", login);

export default router;
