import { Request, Response } from "express";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import catchAsynch from "../../utls/catchAsynch";
import { BranchServices } from "./branch.service";

const createBranch = catchAsynch(async (req: Request, res: Response) => {
    const result = await BranchServices.createBranch(req.body);
    return sendSuccessResponse(res, result, "Branch Created Successfully", 201);
});
const getAllBranches = catchAsynch(async (req: Request, res: Response) => {
    const result = await BranchServices.getAllBranches();
    return sendSuccessResponse(res, result, "All Branches Fetched Successfully", 200);
});

export const BranchController = {
    createBranch,
    getAllBranches,
};
