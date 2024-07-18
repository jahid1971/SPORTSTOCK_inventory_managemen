import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { StockServices } from "./stock.service";

const addStock = catchAsynch(async (req, res) => {
    const result = await StockServices.addStock(req.body);

    sendSuccessResponse(res, result, "Stock added successfully");
});

const getAllStocks = catchAsynch(async (req, res) => {
    const result = await StockServices.getAllStocks(req.query);

    sendSuccessResponse(res, result, "Stock fetched successfully");
})

const adjustStock = catchAsynch(async (req, res) => {
    const result = await StockServices.adjustStock(req.body);

    sendSuccessResponse(res, result, "Stock adjusted successfully");
});

const transferStock = catchAsynch(async (req, res) => {
    const result = await StockServices.transferStock(req.body);

    sendSuccessResponse(res, result, "Stock transfered successfully");
});

export const StockController = {
    addStock,
    getAllStocks,
    adjustStock,
    transferStock
};
