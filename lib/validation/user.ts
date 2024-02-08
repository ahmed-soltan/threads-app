import * as z from 'zod'

export const userValidation = z.object({
    image:z.string().url().nonempty(),
    name:z.string().min(3,{message:"name is required"}).max(30),
    username:z.string().min(3,{message:"username is required"}).max(30),
    bio:z.string().min(3,{message:"username is required"}).max(200),
})