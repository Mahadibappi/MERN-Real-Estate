import express from "express";
import { createList, showListing } from "../controller/listingController.js";
const router = express.Router();
router.post("/create", createList);
router.get("/showListing/:id", showListing);
export default router;
