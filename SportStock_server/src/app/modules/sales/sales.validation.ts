import { z } from "zod";

const saleValidationSchema = z.object({
  _id: z.string().optional(),
  product: z.string().min(1, "Product name is required"),
  buyerName: z.string().min(1, "Buyer name is required"),
  saleDate: z.date(),
  quantity: z.number().positive("Quantity must be a positive number"),
  pricePerUnit: z.number().positive("Price per unit must be a positive number"),
  totalPrice: z.number(),
  branch: z.string().min(1, "Branch name is required"),
  isDeleted: z.boolean().optional(),
});

export const saleValidations = {
    saleValidationSchema,
}