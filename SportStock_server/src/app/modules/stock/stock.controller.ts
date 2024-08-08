import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { StockServices } from "./stock.service";

const addStock = catchAsynch(async (req, res) => {
    const result = await StockServices.addStock(req.body);

    sendSuccessResponse(res, result, "Stock added successfully");
});

const getAllStocks = catchAsynch(async (req, res) => {
    const result = await StockServices.getAllStocks(req.user, req.query);

    sendSuccessResponse(res, result, "Stock fetched successfully");
});

// const getBranchStocks = catchAsynch(async (req, res) => {
//     const result = await StockServices.getBranchStock(req.query);
//     sendSuccessResponse(res, result, "Stock fetched successfully");
// });

const adjustStock = catchAsynch(async (req, res) => {
    const result = await StockServices.adjustStock(req.body);

    sendSuccessResponse(res, result, "Stock adjusted successfully");
});

const transferStock = catchAsynch(async (req, res) => {
    const result = await StockServices.transferStock(req.body);

    sendSuccessResponse(res, result, "Stock transfered successfully");
});

const stocksBarChart = catchAsynch(async (req, res) => {
    const result = await StockServices.stocksBarChart(req.query);
    sendSuccessResponse(
        res,
        result,
        "Stock barchart data data fetched successfully"
    );
});

const stocksPieChart = catchAsynch(async (req, res) => {
    const result = await StockServices.stocksPieChart(req.user);
    sendSuccessResponse(
        res,
        result,
        "Category-wise pie chart data fetched successfully"
    );
});

const getDashboardCardsData = catchAsynch(async (req, res) => {
    const result = await StockServices.getDashboardCardsData(req?.user);
    sendSuccessResponse(
        res,
        result,
        "Dashboard cards data fetched successfully"
    );
});

export const StockController = {
    addStock,
    getAllStocks,
    adjustStock,
    transferStock,
    stocksBarChart,
    stocksPieChart,
    getDashboardCardsData,
    // getBranchStocks,
};
