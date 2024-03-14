import { Request, Response } from "express";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { BrandServices } from "./brand.service";
import catchAsynch from "../../utls/catchAsynch";

const createBrand = catchAsynch(async (req: Request, res: Response) => {
    const result = await BrandServices.createBrand(req.body);
    return sendSuccessResponse(res, result, "Brand Created Successfully", 201);
});
const getAllBrands = catchAsynch(async (req: Request, res: Response) => {
    const result = await BrandServices.getAllBrands();
    return sendSuccessResponse(res, result, "All Brands Fetched Successfully", 200);
});

export const BrandController = {
    createBrand,
    getAllBrands
};
