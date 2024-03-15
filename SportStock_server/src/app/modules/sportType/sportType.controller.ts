import { Request, Response } from "express";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { sportTypeServices } from "./sportType.service";
import catchAsynch from "../../utls/catchAsynch";

const createSportType = catchAsynch(async (req: Request, res: Response) => {
    const result = await sportTypeServices.createSportType(req.body);
    return sendSuccessResponse(res, result, "Sport Type created successfully", 201);
});

const getAllSportTypes = catchAsynch(async( req: Request, res: Response)=>{
    const result = await sportTypeServices.getAllSportTypes();
    return sendSuccessResponse(res, result, "All sport types fetched successfully", 200);
})
export const SportTypeController = {
    createSportType,
    getAllSportTypes
};
