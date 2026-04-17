import z, { email } from "zod";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto{
    static schema = z.object({
        name: z.string({error: "Name is required"}).nonoptional(),
        email: z.string({error: "Email is required"}).nonoptional(),
        password: z.string({error: "Password is required"}).nonoptional()
    })
}

class   LoginDto extends BaseDto{
    static schema = z.object({
        email: z.string({error: "Email is required"}).nonoptional(),
        password: z.string({error: "Password is required"}).nonoptional()
    })
}

// types
type RegisterInputTypes = z.infer<typeof RegisterDto.schema>
type LoginInputTypes = z.infer<typeof LoginDto.schema>
type User ={
    id: number,
    email: string,
    role: string
}

export {
    RegisterDto,
    LoginDto
}

export type {
    User,
    RegisterInputTypes,
    LoginInputTypes
}