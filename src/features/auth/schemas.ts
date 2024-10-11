import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required")
})

export const registerSchema = z.object({
    email: z.string().trim().email(),
    name: z.string().trim(),
    password: z.string().min(8, "Minimum 8 characters")
});