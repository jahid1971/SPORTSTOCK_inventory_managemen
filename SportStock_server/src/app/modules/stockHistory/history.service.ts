import getAllItems from "../../utls/getAllItems";
import { StockHistory } from "./history.model";

const getAllStockHistory = async (query: Record<string, unknown>) => {
    const result = await getAllItems(StockHistory, query, {
        filterableFields: ["branchId", "productId", "stockId"],
        populate: [
            {
                path: "productId",
                select: "_id productName productCode",
            },
            { 
                path: "branchId", 
                select: "_id branchName" 
            },
            {
                path: "stockId",
                select: "_id quantity",
            },
            {
                path: "madeBy",
                select: "_id fullName",
            }
        ],
    });

    return result;
};

export const StockHistoryServices = {
    getAllStockHistory,
};
