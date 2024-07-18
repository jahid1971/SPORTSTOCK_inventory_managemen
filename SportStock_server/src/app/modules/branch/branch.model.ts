import mongoose, { model } from "mongoose";
import { IBranch } from "./branch.interface";

const branchSchema = new mongoose.Schema(
    {
        branchName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

branchSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Branch = model<IBranch>("Branch", branchSchema);
