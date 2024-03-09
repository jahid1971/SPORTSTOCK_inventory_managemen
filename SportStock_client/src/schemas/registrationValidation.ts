import { z } from "zod";

const registerValidate = z
    .object({
        fullName: z.string().trim().min(1, "Name is required").max(50, "Name is too long"),
        email: z.string().email("Invalid email").trim(),
        password: z
            .string()
            .min(4, "Password must be at least 4 characters")
            .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
            .max(255, { message: "Password is too long" })
            .transform((val) => val?.trim()),
        confirmPassword: z.string().trim(),

        branch: z.string().min(1, "branch is required").max(255).trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default registerValidate;
