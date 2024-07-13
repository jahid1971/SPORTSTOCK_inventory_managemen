import mongoose, { model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            required: true,
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

categorySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });

export const Category = model<ICategory>("Category", categorySchema);

