import express from "express";
import {
  createList,
  getAllListings,
  showListing,
} from "../controller/listingController.js";
const router = express.Router();
router.post("/create", createList);
router.get("/showListing/:id", showListing);
router.get("/getall", getAllListings);

export default router;
