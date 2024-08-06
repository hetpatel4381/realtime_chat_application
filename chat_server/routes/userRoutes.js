import { Router } from "express";
import {
  addProfileImage,
  getUserInfo,
  logIn,
  removeProfileImage,
  signUp,
  updateProfile,
} from "../controllers/userController.js";
import verifyJWT from "../middlewares/authMiddleware.js";
import multer from "multer";

const userRouter = Router();
const upload = multer({ dest: "uploads/profiles/" });

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/user-info", verifyJWT, getUserInfo);
userRouter.post("/update-profile", verifyJWT, updateProfile);
userRouter.post(
  "/add-profile-image",
  verifyJWT,
  upload.single("profile-image"),
  addProfileImage
);
userRouter.delete("/remove-profile-image", verifyJWT, removeProfileImage);

export default userRouter;
