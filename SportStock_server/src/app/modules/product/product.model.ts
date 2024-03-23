import { Schema, model } from "mongoose";
import { ConditionType, IProduct, MaterialType } from "./product.interface";

const productSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    branch: { type: String, required: true },
    sportType: { type: Schema.Types.ObjectId, ref: "SportType" },
    brand: { type: String },
    material: { type: String, enum: Object.values(MaterialType) },
    color: { type: String },
    size: { type: String, enum: ["s", "m", "l", "xl", "xxl", "xxxl"] },
    condition: { type: String, enum: Object.values(ConditionType) },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
