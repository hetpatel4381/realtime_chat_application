import { Router } from "express";
import { logIn, signUp } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);

export default userRouter;
