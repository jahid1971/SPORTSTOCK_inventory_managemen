import { object, string, boolean } from "zod";

const createSportTypeSchema = object({
    sportType: string({
        required_error: "Sport type is required",
    })
        .trim()
        .min(1, "Sport type must have at least 1 character"),
    isDeleted: boolean().optional(),
});

const updateSportTypeSchema = createSportTypeSchema.partial(); // Allow partial updates

export const SportTypeValidation = {
    createSportTypeSchema,
    updateSportTypeSchema,
};
