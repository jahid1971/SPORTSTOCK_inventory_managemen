/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import Product from "../product/product.model";
import { ISale } from "./sales.interface";
import Sale from "./sales.model";
import { IUser } from "../user/user.interface";
import { generateSaleId } from "./sales.utls";
import getAllItems from "../../utls/getAllItems";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { userRole } from "../../constants/user";

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
const getSales = async (user: IUser, query: any) => {
    if (user?.role === userRole.BRANCH_MANAGER || user?.role === userRole.SELLER) {
        query["branch._id"] = user.branch;
    }

    const searchableFields = ["saleId", "productName"];
    const allSales = getAllItems(Sale, query, searchableFields);
    return allSales;
};

// // get sales history.............

// const getSalesHistory = async (query) => {

//     const sales = await Sale.find({}).sort({ saleDate: 1 });
//     if (!sales.length) {
//         return { labels: [], sales: [] };
//     }

//     const salesData = sales.reduce((acc, sale) => {
//         const saleDate = new Date(sale.saleDate);
//         let intervalStart, intervalEnd, intervalLabel;

//         switch (query.saleHistoryBy) {
//             case "daily":
//                 intervalStart = format(saleDate, "dd-MMM");
//                 intervalEnd = format(saleDate, "dd-MMM");
//                 intervalLabel = intervalStart;
//                 break;
//             case "weekly":
//                 intervalStart = format(startOfWeek(saleDate), "dd-MMM"); // Default week start from Sunday by date-fns
//                 intervalEnd = format(endOfWeek(saleDate), "dd-MMM");
//                 intervalLabel = `${intervalStart} - ${intervalEnd}`;
//                 break;
//             case "monthly":
//                 intervalStart = format(startOfMonth(saleDate), "MMM");
//                 intervalLabel = intervalStart;
//                 break;
//             case "yearly":
//                 intervalStart = format(startOfYear(saleDate), "yyyy");
//                 intervalLabel = intervalStart;
//                 break;
//             default:
//                 throw new AppError(400, "Invalid saleHistoryBy parameter");
//         }

//         if (!acc[intervalLabel]) {
//             acc[intervalLabel] = 0;
//         }
//         acc[intervalLabel] += sale.totalPrice;

//         return acc;
//     }, {});

//     const labels = Object.keys(salesData);
//     const salesValues = Object.values(salesData);

//     return { labels, sales: salesValues };
// };

const getSalesHistory = async (user: IUser, query: any) => {
    const filter: Record<string, any> = {};
    // if (user?.role === userRole.BRANCH_MANAGER) filter["branch._id"] = user.branch;


    if (user?.role === userRole.BRANCH_MANAGER && user.branch) {
        filter["branch._id"] = new mongoose.Types.ObjectId(user.branch as string);
    }

    let groupBy;
    let dateFormat;
    let timezone;
    if (query?.timezone) timezone = query.timezone;
    else timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    switch (query?.saleHistoryBy) {
        case "daily":
            groupBy = {
                year: { $year: { date: "$saleDate", timezone: timezone } },
                month: { $month: { date: "$saleDate", timezone: timezone } },
                day: { $dayOfMonth: { date: "$saleDate", timezone: timezone } },
            };
            dateFormat = "%d-%b";
            break;
        case "weekly":
            groupBy = {
                year: { $year: { date: "$saleDate", timezone: timezone } },
                week: { $week: { date: "$saleDate", timezone: timezone } },
            };
            dateFormat = "%d-%b";
            break;
        case "monthly":
            groupBy = {
                year: { $year: { date: "$saleDate", timezone: timezone } },
                month: { $month: { date: "$saleDate", timezone: timezone } },
            };
            dateFormat = "%b";
            break;
        case "yearly":
            groupBy = {
                year: { $year: { date: "$saleDate", timezone: timezone } },
            };
            dateFormat = "%Y";
            break;
        default:
            throw new AppError(400, "Invalid saleHistoryBy parameter");
    }

    const salesData = await Sale.aggregate([
        {
            $match: filter,
        },
        {
            $group: {
                _id: groupBy,
                totalSales: { $sum: "$totalPrice" },
                saleDate: { $first: "$saleDate" },
            },
        },
        {
            $sort: { saleDate: 1 },
        },
        {
            $project: {
                _id: 0,
                totalSales: 1,
                saleDate: 1,
                label: {
                    $dateToString: {
                        format: dateFormat,
                        date: "$saleDate",
                        timezone: timezone,
                    },
                },
            },
        },
    ]);

    // Special handling for weekly labels
    if (query.saleHistoryBy === "weekly") {
        salesData.forEach((item) => {
            const startOfWeekDate = startOfWeek(item.saleDate);
            const endOfWeekDate = endOfWeek(item.saleDate);
            item.label = `${format(startOfWeekDate, "dd-MMM")} - ${format(endOfWeekDate, "dd-MMM")}`;
        });
    }

    const labels = salesData.map((data) => data.label);
    const salesValues = salesData.map((data) => data.totalSales);

    return { labels, sales: salesValues };
};

export const SaleServices = {
    createSale,
    getSales,
    getSalesHistory,
};
