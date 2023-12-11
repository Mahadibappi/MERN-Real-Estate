import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/Error.js";
export const createList = async (req, res, next) => {
  try {
    const list = req.body;
    const crateList = await Listing.create(list);
    res.status(200).json(crateList);
    res.send("listing created successful ");
  } catch (error) {
    next(error);
  }
};

export const showListing = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(errorHandler(error.message));
  }
};
