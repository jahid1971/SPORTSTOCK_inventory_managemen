import { Document, Types } from "mongoose";

export interface IStockHistory extends Document {
    stockId: Types.ObjectId;
    branchId: Types.ObjectId;
    transferToStock?: Types.ObjectId;
    productId: Types.ObjectId;
    quantityChanged: number;
    reason: string;
    madeBy: Types.ObjectId;
    date: Date;
}
