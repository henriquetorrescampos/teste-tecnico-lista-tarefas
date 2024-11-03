import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/createRoute.js";
import cors from "cors";

dotenv.config(); // Load .env variables

const app = express(); // Start the express

app.use(
  cors({
    origin: "https://listatarefass.vercel.app/",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URI;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected!");
    app.listen(PORT, () => {
      console.log(`Server running port ${PORT}`);
    });
  })
  .catch((error) => console.log(`Got an error in connection, ${error}`));

app.use("/api", router);

export default app;
