import { Router } from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import { getMessages, uploadFile } from "../controllers/messagesController.js";
import multer from "multer";

const messagesRouter = Router();

const upload = multer({ dest: "uploads/files" });

messagesRouter.post("/get-messages", verifyJWT, getMessages);
messagesRouter.post(
  "/upload-file",
  verifyJWT,
  upload.single("file"),
  uploadFile
);

export default messagesRouter;
