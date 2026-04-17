import * as authController from './auth.controller.js'
import { Router } from "express";
import { LoginDto, RegisterDto } from './dto/auth.dto.js';
import { checkRole, checkToken } from './auth.middleware.js';
import validate from '../../common/middleware/validate.middleware.js';

const authRoutes : Router = Router()

authRoutes.post("/register", validate(RegisterDto), authController.register)
authRoutes.post("/login", validate(LoginDto), authController.login)
authRoutes.get("/me", checkToken, authController.getMe)
authRoutes.post("/logout", authController.logout)

export default authRoutes