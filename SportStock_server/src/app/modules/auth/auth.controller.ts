import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { authServices } from "./auth.service";

// const registration = catchAsynch(async (req: Request, res: Response) => {
//     const result = await authServices.regisration(req.body);
//     return sendSuccessResponse(res, result, "User created successfully", 201);
// });

const registerSeller = catchAsynch(async (req: Request, res: Response) => {
    const result = await authServices.registerSeller(req.body);
    return sendSuccessResponse(res, result, "Request sent. Please wait for approval", 202);
});

const logIn = catchAsynch(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, userObject } = await authServices.logIn(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    });
    const data = {
        user: userObject,
        token: accessToken,
    };
    sendSuccessResponse(res, data, "User logged in successfully", 200);
});

export const authControllers = {
    registerSeller,
    logIn,
};
