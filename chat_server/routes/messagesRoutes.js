import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { getMessages } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/get-messages", verifyJWT, getMessages);

export default messagesRouter;
