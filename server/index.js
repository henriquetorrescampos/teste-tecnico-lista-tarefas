import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/createRoute.js";
import cors from "cors";

dotenv.config(); // Carregar variáveis do .env

const app = express(); // Iniciar o express

app.use(
  cors({
    origin: "https://teste-tecnico-lista-tarefas-front.vercel.app",
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
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`Error connecting to the database: ${error}`));

app.get("/", (request, response) => {
  response.send("Bem-vindo ao backend da lista de tarefas");
});

app.use("/api", router);

export default app;
