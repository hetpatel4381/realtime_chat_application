import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import {
  createChannel,
  getChannelMessages,
  getUserChannels,
} from "../controllers/channelController.js";

const channelRouter = Router();

channelRouter.post("/create-channel", verifyJWT, createChannel);
channelRouter.get("/get-user-channels", verifyJWT, getUserChannels);
channelRouter.get(
  "/get-channel-messages/:channelId",
  verifyJWT,
  getChannelMessages
);

export default channelRouter;
