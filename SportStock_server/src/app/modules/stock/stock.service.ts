import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import getAllItems from "../../utls/getAllItems";
import { IStock } from "./stock.interface";
import { Stock } from "./stock.model";
import { StockHistory } from "../stockHistory/history.model";
import Product from "../product/product.model";
import { userRole } from "../../constants/user";
import { IUser } from "../user/user.interface";
import { convertToObjectId } from "../../utls/utls.global";

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

const getAllStocks = async (user: IUser, query: Record<string, unknown>) => {
    const stockMatch: any = {};

    if (
        user?.role === userRole.BRANCH_MANAGER ||
        user?.role === userRole.SELLER
    ) {
        stockMatch.branchId = user?.branch;
    }

    const pipeline = [
        {
            $match: stockMatch,
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
        {
            $lookup: {
                from: "branches",
                localField: "branchId",
                foreignField: "_id",
                as: "branch",
            },
        },
        { $unwind: "$branch" },
        {
            $lookup: {
                from: "categories",
                localField: "product.category",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: "$category" },
        {
            $project: {
                branchId: 1,
                productId: 1,
                quantity: 1,
                updatedAt: 1,
                branchName: "$branch.branchName",
                productName: "$product.productName",
                category: "$category.category",
                price: "$product.price",
                image: "$product.image",
            },
        },
    ];

    if (query?.minQuantity || query?.maxQuantity) {
        query.quantity = {
            $gte: Number(query?.minQuantity) || 0,
            $lte: Number(query?.maxQuantity) || Infinity,
        };
    }

    if (query?.minPrice || query?.maxPrice) {
        query["product.price"] = {
            $gte: Number(query?.minPrice) || 0,
            $lte: Number(query?.maxPrice) || Infinity,
        };
    }

    convertToObjectId(query, "branchId");

    convertToObjectId(query, "categoryId", { targetField: "category._id" });

    const result = await getAllItems<IStock>(Stock, query, {
        filterableFields: [
            "branchId",
            "category._id",
            "quantity",
            "product.price",
        ],
        searchableFields: [
            "branch.branchName",
            "product.productName",
            "category.category",
        ],
        mode: "aggregate",
        aggregationPipeline: pipeline,
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

const stocksPieChart = async (user: IUser) => {
    const stockMatch: any = {};

    if (
        user?.role === userRole.BRANCH_MANAGER ||
        user?.role === userRole.SELLER
    ) {
        stockMatch.branchId = user?.branch;
    }

    const result = await Stock.aggregate([
        {
            $match: stockMatch,
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

const getDashboardCardsData = async (user: any) => {
    const stockMatch: any = { isDeleted: false };
    const productMatch: any = { isDeleted: false };

    if (
        user?.role === userRole.BRANCH_MANAGER ||
        user?.role === userRole.SELLER
    ) {
        if (user?.branch) {
            stockMatch.branchId = user.branch;
        }
    }

    let totalProducts: number;
    if (stockMatch.branchId) {
        const productIds = await Stock.distinct("productId", stockMatch);
        totalProducts = await Product.countDocuments({
            ...productMatch,
            _id: { $in: productIds },
        });
    } else {
        totalProducts = await Product.countDocuments(productMatch);
    }

    // Total stock items count and total stock value
    const stockAgg = await Stock.aggregate([
        { $match: stockMatch },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
        {
            $group: {
                _id: null,
                totalStockItems: { $sum: "$quantity" },
                totalStockValue: {
                    $sum: { $multiply: ["$quantity", "$product.price"] },
                },
            },
        },
    ]);

    const totalStockItems = stockAgg[0]?.totalStockItems || 0;
    const totalStockValue = stockAgg[0]?.totalStockValue || 0;

    return {
        totalProducts,
        totalStockItems,
        totalStockValue,
    };
};

export const StockServices = {
    addStock,
    getAllStocks,
    adjustStock,
    transferStock,
    stocksBarChart,
    stocksPieChart,
    getDashboardCardsData,
};
