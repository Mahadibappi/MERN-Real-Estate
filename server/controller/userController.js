import User from "../models/userModel.js";
import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";

export const login = (req, res) => {
  res.send("user got here");
};

export const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id) {
  //   return next(errorHandler(401, "You can update only your own account"));
  // }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const removeUser = req.params.id;
    await User.findByIdAndDelete(removeUser);
    res.clearCookie("access_token");
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error.message);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Logout successful");
  } catch (error) {
    next(error.message);
  }
};
