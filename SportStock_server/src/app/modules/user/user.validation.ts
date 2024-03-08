import { z } from "zod";

const userValidationSchema = z.object({
    fullName: z.string().min(1, "Full Name cannot be empty"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    branch: z.string().min(1, "Branch is required"),
    // role: z.enum(["seller", "branchManager", "superAdmin"]),
});
// .refine((data) => {
//     if ((data.role === "branchManager" || data.role === "seller") && !data.branch) {
//         throw new Error("Branch is required");
//     }
//     return true;
// });

export const userValidation = {
    userValidationSchema,
};
