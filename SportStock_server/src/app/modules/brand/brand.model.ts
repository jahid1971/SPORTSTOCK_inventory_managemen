import mongoose, { model } from "mongoose";
import { IBrand } from "./brand.interface";

const brandSchema = new mongoose.Schema(
    {
        brandName: {
            type: String,
            required: true,
            unique: true,
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

brandSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Brand = model<IBrand>("Brand", brandSchema);
