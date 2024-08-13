import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { searchContacts } from "../controllers/contactsController.js";

const contactRouter = Router();

contactRouter.post("/search", verifyJWT, searchContacts);

export default contactRouter;
