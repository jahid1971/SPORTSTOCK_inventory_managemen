import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { StockHistoryServices } from "./history.service";

const getAllStockHistory = catchAsynch(async (req, res) => {
    const result = await StockHistoryServices.getAllStockHistory(
        req.user,
        req.query
    );
    sendSuccessResponse(res, result, "Stock history fetched successfully");
});

const getALlAdjustedStockHistory = catchAsynch(async (req, res) => {
    const result = await StockHistoryServices.getAllAdjustHistory(
        req.user,
        req.query
    );
    sendSuccessResponse(
        res,
        result,
        "Adjusted stock history fetched successfully"
    );
});

const getALlTransferredStockHistory = catchAsynch(async (req, res) => {
    const result = await StockHistoryServices.getALlTransferredStockHistory(
        req.user,
        req.query
    );
    sendSuccessResponse(
        res,
        result,
        "Transferred stock history fetched successfully"
    );
});

const getLineChartData = catchAsynch(async (req, res) => {
    const result = await StockHistoryServices.getLineChartData(
        req.query,
        req.user
    );
    sendSuccessResponse(
        res,
        result,
        "Stock line chart data fetched successfully"
    );
});

export const StockHistoryController = {
    getAllStockHistory,
    getALlAdjustedStockHistory,
    getALlTransferredStockHistory,
    getLineChartData,
};
