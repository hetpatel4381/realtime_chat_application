import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { searchContacts } from "../controllers/contactsController.js";

const contactRouter = Router();

contactRouter.post("/search", verifyJWT, searchContacts);
contactRouter.get("/get-contacts-for-dm", verifyJWT, getContactsForDMList);

export default contactRouter;
