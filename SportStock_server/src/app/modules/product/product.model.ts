import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

// const productSchema = new Schema(
//     {
//         productName: { type: String, required: true },
//         image: { type: String },
//         price: { type: Number, required: true },
//         // quantity: { type: Number, min: 1, required: true },
//         // branch: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
//         category: {
//             type: Schema.Types.ObjectId,
//             ref: "Category",
//             required: true,
//         },
//         brand: { type: String },
//         material: { type: String },
//         color: { type: String },
//         size: { type: String },
//         condition: { type: String},
//         description: { type: String },
//         isDeleted: { type: Boolean, default: false },
//     },

//     { timestamps: true }
// );

const VariantSchema = new Schema({
    size: { type: String },
    color: { type: String },
    material: { type: String },
    condition: { type: String },
});

const productSchema = new Schema(
    {
        productName: { type: String, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        price: { type: Number, required: true },
        productCode: { type: String, required: true, unique: true },
        image: { type: String },
        brand: { type: Schema.Types.ObjectId, ref: "Brand" },
        description: { type: String },
        variants: [VariantSchema],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

productSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

productSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
