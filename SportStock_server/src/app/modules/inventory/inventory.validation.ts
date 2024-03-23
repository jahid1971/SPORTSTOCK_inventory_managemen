import { z } from "zod";
import { ObjectId } from "mongodb";

const InventorySchema = z.object({
    product_id: z.string().refine((val) => ObjectId.isValid(val), {
        message: "Invalid ObjectId for product_id",
    }),
    branch_id: z.string().refine((val) => ObjectId.isValid(val), {
        message: "Invalid ObjectId for branch_id",
    }),
    quantity: z
        .number()
        .positive("Quantity must be a positive number")
        .int("Quantity must be an integer")
        .nonnegative(),
    price: z.number().positive("Price must be a positive number").nonnegative(),
    createdBy: z
        .string()
        .optional()
        .refine((val) => ObjectId.isValid(val), {
            message: "Invalid ObjectId for createdBy",
        }),
});

const InventoryUpdateSchema = InventorySchema.partial();

export const inventoryvalidations = { InventorySchema, InventoryUpdateSchema };
