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

export const getAllListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
