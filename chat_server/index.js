import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: [config.frontendOrigin],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

// All Main Routes.
app.use("/api/auth", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

const server = app.listen(config.port, () => {
  console.log(`Server running on  http://localhost:${config.port}`);
});

setupSocket(server);
