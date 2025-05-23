import { object, string, boolean } from "zod";

const CrteateBrandSchema = object({
    category: string({
        required_error: "Sport type is required",
    })
        .trim()
        .min(1, "Sport type must have at least 1 character"),
    isDeleted: boolean().optional(),
});

const updateBrandSchema = CrteateBrandSchema.partial();

export const CategoryValidation = {
    CrteateBrandSchema,
    updateBrandSchema,
};
