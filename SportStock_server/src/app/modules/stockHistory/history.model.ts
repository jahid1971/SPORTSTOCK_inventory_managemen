import { Schema, model } from "mongoose";
import { IStockHistory } from "./history.interface";

const StockHistorySchema = new Schema<IStockHistory>(
    {
        stockId: {
            type: Schema.Types.ObjectId,
            ref: "Stock",
            required: true,
        },
        branchId: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        transferToStock: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantityChanged: { type: Number, required: true },
        reason: { type: String, required: true },
        madeBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

export const StockHistory = model<IStockHistory>("StockHistory", StockHistorySchema);
