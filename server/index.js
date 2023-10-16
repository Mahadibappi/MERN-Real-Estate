import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes

//mongoose setup
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(() => {
      console.log(`database connected server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("did not connected");
  });
