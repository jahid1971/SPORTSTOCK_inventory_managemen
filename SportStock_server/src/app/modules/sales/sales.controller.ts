/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { SaleServices } from "./sales.service";

const createSale = catchAsynch(async (req: any, res) => {
    const result = await SaleServices.createSale(req.body, req.user);
    return sendSuccessResponse(res, result, "Product old successfully", 201);
});

const getSales = catchAsynch(async (req : any, res) => {
    const result = await SaleServices.getSales(req.user,req.query);
    return sendSuccessResponse(res, result, "Sales fetched successfully", 200);
});

const getSalesHistory = catchAsynch(async (req:any, res) => {
    const result = await SaleServices.getSalesHistory(req.user, req.query);
    return sendSuccessResponse(res, result, "Sales history fetched successfully", 200);
});

export const salesControllers = {
    createSale,
    getSales,
    getSalesHistory,
};
