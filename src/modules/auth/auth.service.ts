import { eq } from "drizzle-orm"
import { LoginInputTypes, RegisterInputTypes } from "./dto/auth.dto.js"
import bcrypt from "bcrypt"
import {Request} from 'express'
import db from "../../common/db/db.js"
import { usersTable } from "../../common/db/schema.js"
import ApiError from "../../common/utils/api-error.js"

const register = async ({name, email, password}: RegisterInputTypes) => {
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if(existing.length !== 0){
        throw ApiError.forbidden("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS as string))

    const user = await db.insert(usersTable).values({name, email, password: hashedPassword})

    if (!user) {
        throw ApiError.internal("User not created")
    }

    return user
}

const login = async ({email, password}: LoginInputTypes) => {
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email))
    
    if(!existing) {
        throw ApiError.notFound("User not found")
    }

    const existingUser = existing[0]
    const isMatch = await bcrypt.compare(password, existingUser?.password as string)

    if(!isMatch) {
        throw ApiError.unauthorized("Invalid password")
    }

    return {id: existingUser?.id, name: existingUser?.name, email: existingUser?.email, role: existingUser?.role}
}

const getMe = async (req: Request & {user?: {id:number, email: string, role: string}}) => {
    return req.user
}

export {
    register,
    login,
    getMe
}