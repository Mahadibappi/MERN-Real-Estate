import express from "express";
import { createList } from "../controller/listingController.js";
const router = express.Router();
router.post("/create", createList);
export default router;
