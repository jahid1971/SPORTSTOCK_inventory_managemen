import mongoose, { model } from "mongoose";
import { ISportType } from "./sportType.interface";

const sportTypeSchema = new mongoose.Schema(
    {
        sportType: {
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

sportTypeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });

export const SportType = model<ISportType>("SportType", sportTypeSchema);

