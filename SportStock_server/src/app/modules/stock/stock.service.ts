import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import getAllItems from "../../utls/getAllItems";
import { IStock } from "./stock.interface";
import { Stock } from "./stock.model";
import { StockHistory } from "../stockHistory/history.model";

const stockHistoryData = (payload: any) => {
    return {
        branchId: payload.branchId,
        productId: payload.productId,
        quantityChanged: payload.quantity,
        reason: payload.reason,
        madeBy: payload.madeBy,
        date: payload.date || new Date(),
    };
};

const addStock = async (
    payload: IStock & { reason: string; madeBy: string; date: Date }
) => {
    const existingStock = await Stock.findOne({
        productId: payload.productId,
        branchId: payload.branchId,
        isDeleted: false,
    });

    if (existingStock) {
        const newQuantity = existingStock.quantity + Number(payload.quantity);
        const resutl = await existingStock.updateOne(
            { quantity: newQuantity },
            { new: true }
        );

        await StockHistory.create({
            stockId: existingStock._id,
            ...stockHistoryData(payload),
        });
        return resutl;
    }

    const result = await Stock.create(payload);
    await StockHistory.create({
        stockId: result._id,
        ...stockHistoryData(payload),
    });

    return result;
};

const adjustStock = async (payload: IStock) => {
    const existingStock = await Stock.findOne({
        productId: payload.productId,
        branchId: payload.branchId,
        isDeleted: false,
    });
    if (!existingStock) {
        throw new AppError(404, "Stock not found");
    }
    const newQuantity = existingStock.quantity - Number(payload.quantity);

    if (newQuantity < 0) {
        throw new AppError(403, "Insufficient stock");
    }
    const result = await existingStock.updateOne({
        quantity: newQuantity,
    });

    await StockHistory.create({
        stockId: existingStock._id,
        ...stockHistoryData(payload),
    });
    return result;
};

const transferStock = async (payload: any) => {
    const fromStock = await Stock.findOne({
        productId: payload.productId,
        branchId: payload.fromBranch,
        isDeleted: false,
    });
    if (!fromStock) throw new AppError(404, "From Stock not found");

    const newFromQuantity = fromStock.quantity - Number(payload.quantity);

    if (newFromQuantity < 0) throw new AppError(403, "Insufficient stock");

    const toStock = await Stock.findOne({
        productId: payload.productId,
        branchId: payload.toBranch,
        isDeleted: false,
    });

    const session = await startSession();
    try {
        session.startTransaction();

        const result = await fromStock.updateOne(
            { quantity: newFromQuantity },
            { session }
        );

        if (toStock) {
            const newToQuantity = toStock.quantity + Number(payload.quantity);
            await toStock.updateOne({ quantity: newToQuantity }, { session });

            const payloadData = {
                ...stockHistoryData(payload),
                stockId: fromStock._id,
                branchId: fromStock.branchId,
                transferToStock: toStock._id,
            };
            await StockHistory.create([payloadData], { session });
        } else {
            const newStock = await Stock.create(
                {
                    branchId: payload.toBranch,
                    productId: payload.productId,
                    quantity: Number(payload.quantity),
                },
                {
                    session,
                }
            );

            const payloadData = {
                ...stockHistoryData(payload),
                branchId: fromStock.branchId,
                stockId: fromStock._id,
                transferToStock: newStock?._id,
            };

            await StockHistory.create([payloadData], { session });
        }

        await session.commitTransaction();
        session.endSession();

        return result;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getAllStocks = async (query: Record<string, unknown>) => {
    const result = await getAllItems<IStock>(Stock, query, {
        filterableFields: ["branchId", "productId"],
        populate: [
            {
                path: "productId",
                select: "_id productName price",
                populate: {
                    path: "category",
                    select: "category",
                },
            },
            { path: "branchId", select: "_id  branchName" },
        ],
    });

    return result;
};

export const StockServices = {
    addStock,
    getAllStocks,
    adjustStock,
    transferStock,
};
