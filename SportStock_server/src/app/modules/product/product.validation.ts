import { z } from "zod";

const productValidationSchema = z.object({
    productName: z.string().trim().min(1, "Product name is required and must not be empty"),
    price: z.number().positive("Price must be a positive number"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    branch: z.string().trim().min(1, "Branch name is required and must not be leeren"),
    category: z.string().optional(),
    brand: z.string().optional(),
    material: z.string().optional(),
    color: z.string().optional(),
    size: z.enum(["s", "m", "l", "xl", "xxl", "xxxl"]),
    condition: z.enum(["used", "new"]).optional(),
});

export const productValidations = {
    productValidationSchema,
};
