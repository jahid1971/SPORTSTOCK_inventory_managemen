import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { userServices } from "./user.service";
import sendSuccessResponse from "../../utls/sendSuccessResponse";

const getAllUsers = catchAsynch(async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers(req.query);
    return sendSuccessResponse(res, result, "All users fetched successfully", 200);
});

const updateUserStatus = catchAsynch(async (req, res) => {
    const result = await userServices.updateUserStatus(req.params.id, req.body);
    sendSuccessResponse(res, result, "Status updated successfully", 200);
});

export const userController = {
    getAllUsers, updateUserStatus
};
