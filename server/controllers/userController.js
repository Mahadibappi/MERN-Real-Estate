import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    console.log(newUser);
    // await newUser.save();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUser = (req, res) => {
  res.json({
    message: "data send successfully",
  });
};
