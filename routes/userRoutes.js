import { Router } from "express";
import * as userController from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoute = Router();

userRoute.get("/users/:id", authMiddleware, userController.getUserInfo)

export default userRoute