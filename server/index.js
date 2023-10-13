const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// configurations
dotenv.config();
const app = express();

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
