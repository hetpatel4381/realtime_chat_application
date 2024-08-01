import { Router } from "express";
import {
  getUserInfo,
  logIn,
  signUp,
  updateProfile,
} from "../controllers/userController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/user-info", verifyJWT, getUserInfo);
userRouter.get("/update-profile", verifyJWT, updateProfile);

export default userRouter;
