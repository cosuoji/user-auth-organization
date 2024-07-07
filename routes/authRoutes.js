import { Router } from "express";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import * as authController from "../controllers/authController.js"
import { loginSchema, registerSchema} from "../validations/validationSchema.js";

const authRoute = Router()


authRoute.post('/register', generateMiddleware(registerSchema), authController.register)
authRoute.post('/login', generateMiddleware(loginSchema), authController.login)

export default authRoute