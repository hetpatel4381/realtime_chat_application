import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { createChannel } from "../controllers/channelController.js";

const channelRouter = Router();

channelRouter.post("/create-channel", verifyJWT, createChannel);

export default channelRouter;
