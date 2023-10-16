import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/user", userRoute);
//mongoose setup
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`database connected `);
  })
  .catch((err) => {
    console.log(` ${err} did not connected`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
