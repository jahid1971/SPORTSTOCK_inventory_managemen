import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import Product from "../product/product.model";
import { ISale } from "./sales.interface";
import Sale from "./sales.model";
import { IUser } from "../user/user.interface";
import { generateSaleId } from "./sales.utls";

// Create a sale.............
const createSale = async (payload: ISale, user: IUser) => {
    const product = await Product.findById(payload.productId);

    if (!product) throw new AppError(404, "Product not found");

    // Check if the product's quantity is sufficient for the sale
    if (product?.quantity < payload.quantity) {
        throw new AppError(400, "Quantity exceeds available amount of products");
    }
    const saleId = await generateSaleId(payload);
    payload.saleId = saleId;
    payload.totalPrice = payload.price * payload.quantity;
    payload.productName = product.productName;
    payload.soldBy = {
        sellerName: user.fullName,
        id: user.id,
    };

    const updatedQuantity = product.quantity - payload.quantity;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updateData =
            updatedQuantity === 0
                ? { quantity: updatedQuantity, isDeleted: true }
                : { quantity: updatedQuantity };

        const updatedProduct = await Product.findByIdAndUpdate(payload.productId, updateData, {
            new: true,
            session,
        });

        if (!updatedProduct) throw new AppError(500, "Failed to update product quantity");

        const sale = await Sale.create([payload], { session });
        if (!sale) throw new AppError(500, "Failed to create sale");

        await session.commitTransaction();
        await session.endSession();

        return sale;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

// get all sales.............
const getSales = async () => {
    const sales = await Sale.find({});
    return sales;
};

export const SaleServices = {
    createSale,
    getSales,
};
