/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { userServices } from "./user.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const createAdmin = catchAsynch(async (req: any, res: Response) => {
    const result = await userServices.createAdmin(req.file, req.body.data);

    return sendSuccessResponse(res, result, "Admin created successfully", 201);
});

const createSeller = catchAsynch(async (req: any, res: Response) => {
    const result = await userServices.createSeller(req.file, req.body.data);

    return sendSuccessResponse(res, result, "Seller created succeffully", 201);
});

const createBranchManager = catchAsynch(async (req: Request, res: Response) => {
    const result = await userServices.createBranchManager(
        req.file,
        req.body.data
    );

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
    const result = await userServices.updateUserStatus(
        req.params.id,
        req.body,
        req.user
    );

    sendSuccessResponse(res, result, "Status updated successfully", 200);
});

const deleteUser = catchAsynch(async (req: any, res) => {
    const result = await userServices.deleteUser(req.params.id);

    sendSuccessResponse(res, result, "User deleted successfully", 200);
});

const updateSeller = catchAsynch(async (req: any, res: Response) => {
    const result = await userServices.updateSeller(
        req.params.id,
        req.file,
        req.body.data
    );

    sendSuccessResponse(res, result, "Seller updated successfully", 200);
});

const getUserById = catchAsynch(async (req: Request, res: Response) => {
    const result = await userServices.getUserById(req.params.id);

    sendSuccessResponse(res, result, "User fetched successfully", 200);
});

export const userController = {
    createAdmin,
    createSeller,
    getAllUsers,
    updateUserStatus,
    createBranchManager,
    deleteUser,
    updateSeller,
    getUserById,
};
