import {Request, Response, NextFunction} from 'express'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { User } from './dto/auth.dto.js'
import ApiError from '../../common/utils/api-error.js'
import db from '../../common/db/db.js'
import { usersTable } from '../../common/db/schema.js'

const verifyToken = async (token : string) => {
    return jwt.verify(token, process.env.SECRET as string) as User
}

const checkToken = async (req: Request & {user?: User}, res: Response, next: NextFunction) => {
    const token = req.cookies?.token

    if(!token){
        throw ApiError.forbidden("Token not found")
    }

    const decoded = await verifyToken(token)

    const existing = await db.select().from(usersTable).where(eq(usersTable?.id, decoded?.id))

    if(!existing){
        throw ApiError.unauthorized("user does not exist")
    }

    const {password: _, ...user} = existing[0]!
    req.user = user
    
    next()
}

const checkRole = (roles : string[]) => {
    return async (req: Request & {user?: User}, res: Response, next: NextFunction) => {
        const user = req.user
        if(!user) {
            throw ApiError.unauthorized("User not found")
        }

        if(!roles.includes(user?.role)) {
            throw ApiError.forbidden("User role not allowed")
        }

        next()
    }
}

export {
    checkToken,
    checkRole
}