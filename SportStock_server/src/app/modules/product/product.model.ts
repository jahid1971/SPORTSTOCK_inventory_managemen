import { Schema, model } from "mongoose";
import { ConditionType, IProduct, MaterialType, SportType } from "./product.interface";

const productSchema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productSize: { type: String, required: true },
    productBranch: { type: String, required: true },
    sportType: { type: String, enum: Object.values(SportType) },
    brand: { type: String },
    material: { type: String, enum: Object.values(MaterialType) },
    color: { type: String },
    size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "XXXL"] },
    condition: { type: String, enum: Object.values(ConditionType) },
    weight: { type: String },
    style: { type: String },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
