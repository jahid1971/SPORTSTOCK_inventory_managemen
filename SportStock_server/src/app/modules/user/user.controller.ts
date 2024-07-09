/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { userServices } from "./user.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const createSeller = catchAsynch(async (req: any, res: Response) => {
    const result = await userServices.createSeller(req.file, req.body);

    return sendSuccessResponse(res, result, "Seller created succeffully", 201);
});

const createBranchManager = catchAsynch(async (req: Request, res: Response) => {
    const result = await userServices.createBranchManager(req.file, req.body);

    return sendSuccessResponse(
        res,
        result,
        "Branch manager created successfully",
        201
    );
});

const getAllUsers = catchAsynch(async (req: any, res: Response) => {
    const result = await userServices.getAllUsers(req.user, req.query);

    return sendSuccessResponse(
        res,
        result,
        "All users fetched successfully",
        200
    );
});

const updateUserStatus = catchAsynch(async (req: any, res) => {
    const result = await userServices.updateUserStatus(req.params.id, req.body);

    sendSuccessResponse(res, result, "Status updated successfully", 200);
});

const deleteUser = catchAsynch(async (req: any, res) => {
    const result = await userServices.deleteUser(req.params.id);
    
    sendSuccessResponse(res, result, "User deleted successfully", 200);
});

export const userController = {
    createSeller,
    getAllUsers,
    updateUserStatus,
    createBranchManager,
    deleteUser,
};
