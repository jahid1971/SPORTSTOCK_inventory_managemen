import mongoose from "mongoose";
import getAllItems from "../../utls/getAllItems";
import { StockHistory } from "./history.model";
import { convertToObjectId } from "../../utls/utls.global";
import { Branch } from "../branch/branch.model";
import AppError from "../../errors/AppError";
import { userRole } from "../../constants/user";
import { IUser } from "../user/user.interface";

const getAllStockHistory = async (
    user: IUser,
    query: Record<string, unknown>,
    andConditions?: any[]
) => {
    const aggregationPipeline = [
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productId",
            },
        },
        { $unwind: "$productId" },
        {
            $lookup: {
                from: "categories",
                localField: "productId.category",
                foreignField: "_id",
                as: "categoryId",
            },
        },
        { $unwind: "$categoryId" },
        {
            $lookup: {
                from: "branches",
                localField: "branchId",
                foreignField: "_id",
                as: "branchId",
            },
        },
        { $unwind: "$branchId" },

        {
            $lookup: {
                from: "branches",
                localField: "transferToStock",
                foreignField: "_id",
                as: "transferToStock",
            },
        },
        {
            $unwind: {
                path: "$transferToStock",
                preserveNullAndEmptyArrays: true, //preserve the document even if transferToStock is missing or not matched
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "madeBy",
                foreignField: "_id",
                as: "madeBy",
            },
        },
        { $unwind: "$madeBy" },

        {
            $project: {
                _id: 1,
                quantityChanged: 1,
                createdAt: 1,
                updatedAt: 1,
                date: 1,
                reason: 1,
                "productId._id": 1,
                "productId.productName": 1,
                "productId.productCode": 1,
                "branchId._id": 1,
                "branchId.branchName": 1,
                "transferToStock._id": 1,
                "transferToStock.branchName": 1,
                "madeBy._id": 1,
                "madeBy.fullName": 1,
                "categoryId._id": 1,
                "categoryId.category": 1,
            },
        },
    ];

    convertToObjectId(query, "branchId", { nested: true });
    convertToObjectId(query, "productId", { nested: true });
    convertToObjectId(query, "stockId", { nested: true });
    convertToObjectId(query, "madeBy", { nested: true });
    convertToObjectId(query, "categoryId", { nested: true });

    console.log(query, " query  ================================");

    if (query?.minQuantityChanged || query?.maxQuantityChanged) {
        query.quantityChanged = {
            $gte: Number(query?.minQuantityChanged) || 0,
            $lte: Number(query?.maxQuantityChanged) || Infinity,
        };
    }

    if (query.startDate || query.endDate) {
        query.date = {
            $gte: new Date(query.startDate as string),
            $lte: new Date(query.endDate as string),
        };
    }

    const result = await getAllItems(StockHistory, query, {
        searchableFields: [
            "productId.productName",
            "branchId.branchName",
            "madeBy.fullName",
            "categoryId.category",
        ],
        filterableFields: [
            "branchId._id",
            "productId._id",
            "categoryId._id",
            "stockId._id",
            "madeBy._id",
            "quantityChanged",
            "date",
            "reason",
            "transferToStock",
        ],
        mode: "aggregate",
        aggregationPipeline,
        andConditions: andConditions || [],
    });

    return result;
};

const getAllAdjustHistory = async (query: Record<string, unknown>) => {
    query.reason = { $nin: ["added", "transferred"] };

    const adjustedStockHistory = await getAllStockHistory(query);

    return adjustedStockHistory;
};

const getALlTransferredStockHistory = async (
    user: IUser,
    query: Record<string, unknown>
) => {
    query.reason = "transferred";

    const andConditions = [];

    if (user?.role === userRole.BRANCH_MANAGER) {
        andConditions.push({
            $or: [
                { "branchId._id": user?.branch },
                { "transferToStock._id": user?.branch },
            ],
        });
    }

    const transferredStockHistory = await getAllStockHistory(
        query,
        andConditions
    );

    return transferredStockHistory;
};

const getLineChartData = async (
    query: Record<string, unknown>,
    user: IUser
) => {
    const now = new Date();

    const startDate = new Date(now);
    let groupBy;
    let dateFormat;
    const timezone =
        (query?.timezone as string) ||
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    switch (query?.range) {
        case "lastWeek":
            startDate.setDate(now.getDate() - 6);
            groupBy = {
                dayOfWeek: { $dayOfWeek: { date: "$date", timezone } },
            };
            break;

        case "lastMonth":
            startDate.setDate(now.getDate() - 29);
            groupBy = {
                date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$date",
                        timezone,
                    },
                },
            };
            dateFormat = "%d-%b";
            break;

        case "lastYear":
            startDate.setMonth(now.getMonth() - 11);
            groupBy = {
                date: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$date",
                        timezone,
                    },
                },
            };
            dateFormat = "%b";
            break;

        default:
            throw new AppError(403, "Invalid range parameter");
    }

    const pipeline: any[] = [
        {
            $match: {
                date: { $gte: startDate },
                ...(user?.role === userRole.BRANCH_MANAGER && {
                    branchId: user.branch,
                }),
            },
        },
        {
            $group: {
                _id: groupBy,
                incoming: {
                    $sum: {
                        $cond: [
                            { $eq: ["$reason", "added"] },
                            "$quantityChanged",
                            0,
                        ],
                    },
                },
                outgoing: {
                    $sum: {
                        $cond: [
                            {
                                $in: [
                                    "$reason",
                                    ["sold", "damaged", "transferred"],
                                ],
                            },
                            "$quantityChanged",
                            0,
                        ],
                    },
                },

                // totalStock: { $sum: "$quantityChanged" },
                date: { $first: "$date" },
            },
        },
        {
            $sort: { date: 1 },
        },
    ];

    if (query?.range === "lastWeek") {
        pipeline.push({
            $project: {
                _id: 0,
                date: "$_id.dayOfWeek",
                incoming: 1,
                outgoing: 1,
            },
        });
    } else {
        pipeline.push({
            $project: {
                _id: 0,
                date: {
                    $dateToString: {
                        format: dateFormat,
                        date: "$date",
                    },
                },
                incoming: 1,
                outgoing: 1,
            },
        });
    }

    let result = await StockHistory.aggregate(pipeline);

    if (query?.range === "lastWeek") {
        const weekdays = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        result = result.map((item) => ({
            ...item,
            date: weekdays[item.date] || item.date,
        }));
    }

    return result;
};

export const StockHistoryServices = {
    getAllStockHistory,
    getAllAdjustHistory,
    getALlTransferredStockHistory,
    getLineChartData,
};
