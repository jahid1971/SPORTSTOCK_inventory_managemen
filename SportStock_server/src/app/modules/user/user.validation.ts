import { z } from "zod";

const userValidationSchema = z.object({
    fullName: z.string().min(1, "Full Name cannot be empty"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    branch: z.string().min(1, "Branch is required"),
    userPhoto: z.string().optional(),
    contactNumber: z.string().min(1, "Contact Number is required"),
    address: z.string().min(1, "Address is required"),
});
// .refine((data) => {
//     if ((data.role === "branchManager" || data.role === "seller") && !data.branch) {
//         throw new Error("Branch is required");
//     }
//     return true;
// });
const adminvalidationSchema = z.object({
    fullName: z.string().min(1, "Full Name cannot be empty"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    userPhoto: z.string().optional(),
    contactNumber: z.string().min(1, "Contact Number is required"),
    address: z.string().min(1, "Address is required"),
});

export const userValidation = {
    userValidationSchema,
    adminvalidationSchema,
};
