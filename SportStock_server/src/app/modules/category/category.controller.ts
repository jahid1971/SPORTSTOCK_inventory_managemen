import { Request, Response } from "express";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { categoryServices } from "./category.service";
import catchAsynch from "../../utls/catchAsynch";

const createCategory = catchAsynch(async (req: Request, res: Response) => {
    const result = await categoryServices.createCategory(req.body);
    return sendSuccessResponse(
        res,
        result,
        "Sport Type created successfully",
        201
    );
});

const getAllCategory = catchAsynch(async (req: Request, res: Response) => {
    const result = await categoryServices.getAllCategory();
    return sendSuccessResponse(
        res,
        result,
        "All sport types fetched successfully",
        200
    );
});
export const CategoryController = {
    createCategory,
    getAllCategory,
};
