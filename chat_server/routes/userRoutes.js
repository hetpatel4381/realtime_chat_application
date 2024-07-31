import { Router } from "express";
import { signUp } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);

export default userRouter;
