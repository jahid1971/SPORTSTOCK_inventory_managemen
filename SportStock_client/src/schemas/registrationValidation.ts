import { z } from "zod";

const createUserValidate = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(50, "Name is too long"),
    email: z.string().email("Invalid email").trim(),
    userPhoto: z.instanceof(File).optional(),
    branch: z.string().min(1, "branch is required").max(255).trim(),
    password: z
        .string()
        .min(4, "Password is too short")
        .max(25, "Password is too long"),
    contactNumber: z
        .string()
        .trim()
        .min(1, "Contact number is required")
        .max(15, "Contact number is too long")
        .regex(/^[0-9]+$/, "Contact number must be a number"),
    address: z
        .string()
        .trim()
        .min(1, "Address is required")
        .max(255, "Address is too long"),
});

export default createUserValidate;
