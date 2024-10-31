import dotenv from "dotenv"; // Use import para dotenv

dotenv.config(); // load .env variables
console.log(process.env.MONGO_URL);
