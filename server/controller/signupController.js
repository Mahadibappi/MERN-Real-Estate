import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/Error.js";

//create new user
export const singUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

// login function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong password"));
    res.status(200).json("found this user");
  } catch (error) {
    next(error);
  }
};
