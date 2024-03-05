import { z } from "zod";

const userValidationSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty"),
    lastName: z.string().min(1, "Last name cannot be empty"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    // passwordChangedAt: z.optional(
    //     z.object({
    //         getTime: z.function().args(z.unknown()).returns(z.unknown()),
    //         type: z.literal("Date"),
    //     })
    // ),
    branch: z.optional(z.string()),
    role: z.enum(["seller", "branchManager", "superAdmin"]),
});

export const userValidation = {
    userValidationSchema,
};
