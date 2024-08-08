import getAllItems from "../../utls/getAllItems";
import { StockHistory } from "./history.model";
import { convertToObjectId } from "../../utls/utls.global";
import AppError from "../../errors/AppError";
import { userRole } from "../../constants/user";
import { IUser } from "../user/user.interface";

const getAllStockHistory = async (
    user: IUser,
    query: Record<string, unknown> = {},
    andConditions?: any[],
    transferFlag: boolean = false
) => {
    const stockMatch: any = {};
    if (
        (user?.role === userRole.BRANCH_MANAGER ||
            user?.role === userRole.SELLER) &&
        !transferFlag
    ) {
        stockMatch.branchId = user?.branch;
    }

    const aggregationPipeline = [
        // {
        //     $match: stockMatch,
        // },
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
                from: "categories",
                localField: "product.category",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: "$category" },
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
                from: "branches",
                localField: "transferToStock",
                foreignField: "_id",
                as: "toBranch",
            },
        },
        {
            $unwind: {
                path: "$toBranch",
                preserveNullAndEmptyArrays: true, //it will keep the documents even if it is null
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "madeBy",
                foreignField: "_id",
                as: "createdBy",
            },
        },
        { $unwind: "$createdBy" },

        {
            $project: {
                _id: 1,
                quantityChanged: 1,
                date: 1,
                reason: 1,
                productId: 1,
                branchId: 1,
                categoryId: "$category._id",
                transferToStock: 1,
                madeBy: 1,
                productName: "$product.productName",
                productCode: "$product.productCode",
                branchName: "$branch.branchName",
                transferToStockName: "$toBranch.branchName",
                categoryName: "$category.category",
                madeByName: "$createdBy.fullName",
            },
        },
    ];

    convertToObjectId(query, "branchId");
    convertToObjectId(query, "productId");
    convertToObjectId(query, "madeBy");
    convertToObjectId(query, "categoryId", { targetField: "category._id" });

    if (query?.startDate || query?.endDate) {
        query.date = {
            $gte: query.startDate
                ? new Date(query.startDate as string)
                : new Date(0),
            $lte: query.endDate
                ? new Date(query.endDate as string)
                : new Date(),
        };
    }

    if (query?.minQuantityChanged || query?.maxQuantityChanged) {
        query.quantityChanged = {
            $gte: Number(query?.minQuantityChanged) || 0,
            $lte: Number(query?.maxQuantityChanged) || Infinity,
        };
    }

    const result = await getAllItems(StockHistory, query, {
        searchableFields: [
            "product.productName",
            "branch.branchName",
            "madeBy.fullName",
            "category.category",
        ],
        filterableFields: [
            "branchId",
            "productId",
            "category._id",
            "madeBy",
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

const getAllAdjustHistory = async (
    user: IUser,
    query: Record<string, unknown>
) => {
    query.reason = { $nin: ["added", "transferred"] };

    const adjustedStockHistory = await getAllStockHistory(user, query);

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
                { branchId: user?.branch },
                { transferToStock: user?.branch },
            ],
        });
    }

    const transferredStockHistory = await getAllStockHistory(
        user,
        query,
        andConditions,
        true
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
