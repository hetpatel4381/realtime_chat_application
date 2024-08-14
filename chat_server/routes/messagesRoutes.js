import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { getMessages } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.post("/get-messages", verifyJWT, getMessages);

export default messagesRouter;
