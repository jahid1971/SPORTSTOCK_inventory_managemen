import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { StockHistoryServices } from "./history.service";

const getAllStockHistory = catchAsynch(async (req, res) => {
    
    const result = await StockHistoryServices.getAllStockHistory(req.query);
    sendSuccessResponse(res, result, "Stock history fetched successfully");
});

export const StockHistoryController = {
    getAllStockHistory,
};
