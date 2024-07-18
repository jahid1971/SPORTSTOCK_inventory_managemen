import { Schema, Types, model } from "mongoose";
import { IStock } from "./stock.interface";

const StockSchema = new Schema(
    {
        branchId: {
            type: Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        productId: {
            type: Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: { type: Number, required: true },
        updatedAt: { type: Date, default: Date.now },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

StockSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

StockSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

export const Stock = model<IStock>("Stock", StockSchema);
