import mongoose, { model } from "mongoose";
import { IBrand } from "./brand.interface";
import { IBranch } from "./branch.interface";

const branchSchema = new mongoose.Schema(
    {
        branchName: {
            type: String,
            required: true,
            unique: true,
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
