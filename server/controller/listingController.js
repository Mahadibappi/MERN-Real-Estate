import Listing from "../models/listingModel.js";
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
