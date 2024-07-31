import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

connectDB();
const app = express();

app.listen(config.port, () => {
  console.log(`Server running on  http://localhost:${config.port}`);
});
