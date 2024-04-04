import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import Product from "../product/product.model";
import { ISale } from "./sales.interface";
import Sale from "./sales.model";
import { IUser } from "../user/user.interface";
import { generateSaleId } from "./sales.utls";
import getAllItems from "../../utls/getAllItems";
import { endOfWeek, format, startOfMonth, startOfWeek, startOfYear } from "date-fns";

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
const getSales = async (query) => {
    const searchableFields = ["saleId", "productName"];
    const allSales = getAllItems(Sale, query, searchableFields);
    return allSales;
};

// get sales history.............

const getSalesHistory = async (query) => {

    const sales = await Sale.find({}).sort({ saleDate: 1 });
    if (!sales.length) {
        return { labels: [], sales: [] }; 
    }

    const salesData = sales.reduce((acc, sale) => {
        const saleDate = new Date(sale.saleDate);
        let intervalStart, intervalEnd, intervalLabel;

        switch (query.saleHistoryBy) {
            case "daily":
                intervalStart = format(saleDate, "dd-MMM");
                intervalEnd = format(saleDate, "dd-MMM");
                intervalLabel = intervalStart;
                break;
            case "weekly":
                intervalStart = format(startOfWeek(saleDate), "dd-MMM"); // Default week start from Sunday by date-fns
                intervalEnd = format(endOfWeek(saleDate), "dd-MMM");
                intervalLabel = `${intervalStart} - ${intervalEnd}`;
                break;
            case "monthly":
                intervalStart = format(startOfMonth(saleDate), "MMM");
                intervalLabel = intervalStart;
                break;
            case "yearly":
                intervalStart = format(startOfYear(saleDate), "yyyy");
                intervalLabel = intervalStart;
                break;
            default:
                throw new AppError(400, "Invalid saleHistoryBy parameter");
        }

        if (!acc[intervalLabel]) {
            acc[intervalLabel] = 0;
        }
        acc[intervalLabel] += sale.totalPrice;

        return acc;
    }, {});

    const labels = Object.keys(salesData);
    const salesValues = Object.values(salesData);

    return { labels, sales: salesValues };
};

export const SaleServices = {
    createSale,
    getSales,
    getSalesHistory,
};
