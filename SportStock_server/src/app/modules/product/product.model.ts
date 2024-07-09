import { Schema, model } from "mongoose";
import { ConditionType, IProduct} from "./product.interface";

const productSchema = new Schema(
    {
        productName: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, min: 1, required: true },//min: 1  for positive value
        branch: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
        sportType: { type: Schema.Types.ObjectId, ref: "SportType", required: true },
        brand: { type: String },
        material: { type: String },
        color: { type: String },
        size: { type: String },
        condition: { type: String, enum: Object.values(ConditionType) },
        description: { type: String },
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
