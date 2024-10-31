import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/createRoute.js";

dotenv.config(); // Load .env variables
const app = express(); // Start the express
app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected!");

    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  })
  .catch((error) => console.log(`Got an error in connection, ${error}`));

app.use("/api", router);
