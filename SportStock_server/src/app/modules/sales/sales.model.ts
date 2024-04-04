import { Schema, model } from "mongoose";
import { ISale } from "./sales.interface";

const saleSchema = new Schema(
    {
        productName: { type: String, required: true, minlength: 1 },
        saleId: { type: String, required: true, minlength: 1 },
        productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
        buyerName: { type: String, required: true, minlength: 1 },
        soldBy: {
            sellerName: { type: String, required: true, minlength: 1 },
            id: { type: String, required: true, minlength: 1 },
        },
        saleDate: { type: Date, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        totalPrice: { type: Number, required: true },
        branch: {
            _id: { type: Schema.Types.ObjectId, ref: "Branch", required: true, minlength: 1 },
            branchName: { type: String, required: true, minlength: 1 },
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

saleSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

saleSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Sale = model<ISale>("Sale", saleSchema);
export default Sale;
