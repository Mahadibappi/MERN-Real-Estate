import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

// configurations
dotenv.config();
const app = express();
app.use(cors());

//Routes
app.use("/api/user", userRoute);

//mongoose setup
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {})
  .catch((err) => {
    console.log("database not connected");
  });

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
