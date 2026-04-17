import * as authService from './auth.service.js'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { User } from './dto/auth.dto.js'
import ApiResponse from '../../common/utils/api-response.js'

const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.SECRET as string, {expiresIn: "1d"})
}

const register = async(req: Request, res: Response) => {
    const user = await authService.register(req.body)
    ApiResponse.ok(res, "user created successfully", user)
}

const login = async(req: Request, res: Response) => {
    const user = await authService.login(req.body)

    const token = generateToken(user)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })

    ApiResponse.ok(res, "user logged in successfully", user)
}

const getMe = async(req: Request & {user?: User}, res: Response) => {
    const user = await authService.getMe(req)
    ApiResponse.ok(res, "user fetched successfully", user)
}

const logout = async(req: Request & {user?: User}, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    ApiResponse.ok(res, "user logged out successfully")
}

export {
    register,
    login,
    getMe,
    logout
}