import express from "express";
import {
  allListing,
  createList,
  showListing,
} from "../controller/listingController.js";
const router = express.Router();
router.post("/create", createList);
router.get("/showListing/:id", showListing);
router.get("/getall", allListing);

export default router;
