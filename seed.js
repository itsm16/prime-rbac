import 'dotenv/config'
import db from './src/common/db/db.js'
import { usersTable } from './src/common/db/schema.js'
import bcrypt from 'bcrypt'

const hash = async (str) => {
    return bcrypt.hash(str, parseInt(process.env.SALT_ROUNDS))
}

const vars = {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin"
}

const main = async () => {
    try {
        const {name, email, role} = vars
        const hashedPassword = await hash(process.env.ADMIN_PASSWORD)

        const user = await db.insert(usersTable).values({name, email, role, password: hashedPassword})

        console.log(user)
        console.log("Admin created successfully")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()