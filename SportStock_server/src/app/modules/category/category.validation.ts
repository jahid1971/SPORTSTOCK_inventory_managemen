import { object, string, boolean } from "zod";

const createCategorySchema = object({
    category: string({
        required_error: "Sport type is required",
    })
        .trim()
        .min(1, "Sport type must have at least 1 character"),
    isDeleted: boolean().optional(),
});

const updateCategorySchema = createCategorySchema.partial(); // Allow partial updates

export const CategoryValidation = {
    createCategorySchema,
    updateCategorySchema,
};
