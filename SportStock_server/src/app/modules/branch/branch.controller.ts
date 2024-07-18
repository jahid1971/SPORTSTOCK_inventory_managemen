/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import catchAsynch from "../../utls/catchAsynch";
import { BranchServices } from "./branch.service";

const createBranch = catchAsynch(async (req: any, res: Response) => {
    const result = await BranchServices.createBranch(req.body);
    return sendSuccessResponse(res, result, "Branch Created Successfully", 201);
});
const getAllBranches = catchAsynch(async (req: Request, res: Response) => {
    const result = await BranchServices.getAllBranches(
        (req as any).user,
        req.query
    );
    return sendSuccessResponse(
        res,
        result,
        "All Branches Fetched Successfully",
        200
    );
});

const updateBranchStatus = catchAsynch(async (req: any, res: Response) => {
    const { branchId } = req.params;
    const { status } = req.body;
    const result = await BranchServices.updateBranchStatus(branchId, status);
    return sendSuccessResponse(
        res,
        result,
        "Branch Status Updated Successfully",
        200
    );
});

const deleteBranch = catchAsynch(async (req: any, res: Response) => {
    const { id } = req.params;
    const result = await BranchServices.deleteBranch(id);
    return sendSuccessResponse(res, result, "Branch Deleted Successfully", 200);
});

export const BranchController = {
    createBranch,
    getAllBranches,
    updateBranchStatus,
    deleteBranch,
};
