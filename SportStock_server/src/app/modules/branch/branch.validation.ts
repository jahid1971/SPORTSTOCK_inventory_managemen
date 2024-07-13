import { object, string, boolean } from "zod";

const CrteateBranchSchema = object({
    branchName: string({
        required_error: "Branch is required",
    })
        .trim()
        .min(1, "Branch must have at least 1 character"),
    location: string({
        required_error: "Location is required",
    })
        .trim()
        .min(1, "Location must have at least 1 character"),
    isDeleted: boolean().optional(),
});

const updateBranchSchema = CrteateBranchSchema.partial();

export const BranchValidation = {
    CrteateBranchSchema,
    updateBranchSchema,
};
