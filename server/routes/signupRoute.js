import express from "express";
import { google, login, singUp } from "../controller/signupController.js";
const router = express.Router();
router.post("/signup", singUp);
router.post("/signin", login);
router.post("/google", google);

export default router;
