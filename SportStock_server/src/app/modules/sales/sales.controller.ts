import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { SaleServices } from "./sales.service";

const createSale = catchAsynch(async (req, res) => {
    const result = await SaleServices.createSale(req.body,req.user);
    return sendSuccessResponse(res, result, "Product old successfully", 201);
});

const getSales = catchAsynch(async (req, res) => {
    const result = await SaleServices.getSales();
    return sendSuccessResponse(res, result, "Sales fetched successfully", 200);
})

export const salesControllers = {
    createSale,
    getSales
};
