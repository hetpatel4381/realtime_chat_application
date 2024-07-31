import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: [config.frontendOrigin],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(config.port, () => {
  console.log(`Server running on  http://localhost:${config.port}`);
});
