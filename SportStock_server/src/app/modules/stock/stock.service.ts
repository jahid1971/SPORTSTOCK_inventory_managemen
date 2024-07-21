import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import getAllItems from "../../utls/getAllItems";
import { IStock } from "./stock.interface";
import { Stock } from "./stock.model";
import { StockHistory } from "../stockHistory/history.model";
import Product from "../product/product.model";

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
    const session = await startSession();
    try {
        session.startTransaction();

        const existingStock = await Stock.findOne({
            productId: payload.productId,
            branchId: payload.branchId,
            isDeleted: false,
        }).session(session);

        if (existingStock) {
            const newQuantity =
                existingStock.quantity + Number(payload.quantity);
            const result = await existingStock.updateOne(
                { quantity: newQuantity },
                { new: true, session }
            );

            await StockHistory.create(
                [{ stockId: existingStock._id, ...stockHistoryData(payload) }],
                { session }
            );

            await session.commitTransaction();
            return result;
        }

        const result = await Stock.create([payload], { session });
        await StockHistory.create(
            [{ stockId: result[0]._id, ...stockHistoryData(payload) }],
            { session }
        );

        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const adjustStock = async (payload: IStock) => {
    const session = await startSession();
    try {
        session.startTransaction();

        const existingStock = await Stock.findOne({
            productId: payload.productId,
            branchId: payload.branchId,
            isDeleted: false,
        }).session(session);

        if (!existingStock) {
            throw new AppError(404, "Stock not found");
        }

        const newQuantity = existingStock.quantity - Number(payload.quantity);
        if (newQuantity < 0) {
            throw new AppError(403, "Insufficient stock");
        }

        const result = await existingStock.updateOne(
            { quantity: newQuantity },
            { session }
        );

        const historyData = {
            ...stockHistoryData(payload),
            quantityChanged: payload.quantity,
            stockId: existingStock._id,
            date: payload.updatedAt,
        };

        await StockHistory.create([{ ...historyData }], { session });

        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const transferStock = async (payload: any) => {
    const session = await startSession();
    try {
        session.startTransaction();

        const fromStock = await Stock.findOne({
            productId: payload.productId,
            branchId: payload.fromBranch,
            isDeleted: false,
        }).session(session);

        if (!fromStock) throw new AppError(404, "From Stock not found");

        if (fromStock.branchId === payload.toBranch) {
            throw new AppError(
                403,
                "You cannot transfer stock to the same branch"
            );
        }

        const newFromQuantity = fromStock.quantity - Number(payload.quantity);
        if (newFromQuantity < 0) throw new AppError(403, "Insufficient stock");

        const toStock = await Stock.findOne({
            productId: payload.productId,
            branchId: payload.toBranch,
            isDeleted: false,
        }).session(session);

        await fromStock.updateOne({ quantity: newFromQuantity }, { session });

        if (toStock) {
            const newToQuantity = toStock.quantity + Number(payload.quantity);
            await toStock.updateOne({ quantity: newToQuantity }, { session });

            const payloadData = {
                ...stockHistoryData(payload),
                stockId: fromStock._id,
                branchId: fromStock.branchId,
                transferToStock: toStock.branchId,
            };
            await StockHistory.create([payloadData], { session });
        } else {
            const newStock = await Stock.create(
                [
                    {
                        branchId: payload.toBranch,
                        productId: payload.productId,
                        quantity: Number(payload.quantity),
                    },
                ],
                { session }
            );

            const payloadData = {
                ...stockHistoryData(payload),
                branchId: fromStock.branchId,
                stockId: fromStock._id,
                transferToStock: newStock[0]?.branchId,
            };

            await StockHistory.create([payloadData], { session });
        }

        await session.commitTransaction();
        return fromStock;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
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

const stocksBarChart = async (query: Record<string, unknown>) => {
    const result = await Stock.aggregate([
        {
            $match: {
                ...(query?.branchId ? { branchId: query.branchId } : {}),
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $lookup: {
                from: "branches",
                localField: "branchId",
                foreignField: "_id",
                as: "branch",
            },
        },
        {
            $unwind: "$branch",
        },
        {
            $group: {
                _id: "$branchId",
                branchName: { $first: "$branch.branchName" },
                totalQuantity: { $sum: "$quantity" },
                totalPrice: {
                    $sum: { $multiply: ["$quantity", "$product.price"] },
                },
            },
        },

        {
            $project: {
                _id: 0,
                branchName: 1,
                totalQuantity: 1,
                totalPrice: 1,
            },
        },
    ]);

    return result;
};

const stocksPieChart = async () => {
    const result = await Stock.aggregate([
        {
            $match: {
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $lookup: {
                from: "categories",
                localField: "product.category",
                foreignField: "_id",
                as: "category",
            },
        },
        {
            $unwind: "$category",
        },
        {
            $group: {
                _id: "$category._id",
                category: { $first: "$category.category" },
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $project: {
                _id: 0,
                category: 1,
                totalQuantity: 1,
            },
        },
    ]);

    return result;
};

const getDashboardCards = async (user) => {
    const result = await Stock.aggregate([
        {
            $match: {
                isDeleted: false,
            },
        },

        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },

        {
            $unwind: "$product",
        },

        {
            $group: {
                _id: null,
                totalStocks: { $sum: "$quantity" },

                totalStockValue: {
                    $sum: { $multiply: ["$quantity", "$product.price"] },
                },
                uniqueProducts: { $addToSet: "$product._id" },
            },
        },

        {
            $project: {
                _id: 0,
                totalStocks: 1,
                totalStockValue: 1,
                totalProducts: { $size: "$uniqueProducts" },
            },
        },
    ]);

    return result[0];
};

export const StockServices = {
    addStock,
    getAllStocks,
    adjustStock,
    transferStock,
    stocksBarChart,
    stocksPieChart,
    getDashboardCards,
};
