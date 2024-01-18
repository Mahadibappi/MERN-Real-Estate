import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import signupRoute from "./routes/signupRoute.js";
import listingRoute from "./routes/listingRoute.js";

// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    credentials: true,
  })
);

//routes
app.use("/api/user", userRoute);
app.use("/api/user", signupRoute);
app.use("/api/listing", listingRoute);

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

//error handle
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
