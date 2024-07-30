/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { authServices } from "./auth.service";
import AppError from "../../errors/AppError";

const getMe = catchAsynch(async (req, res) => {
    const refreshToken = req?.cookies?.refreshToken;

    const { accessToken, userObject } = await authServices.getMe(refreshToken);

    const data = {
        user: userObject,
        token: accessToken,
    };

    return sendSuccessResponse(res, data, "User fetched successfully", 200);
});

const logIn = catchAsynch(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, userObject } = await authServices.logIn(
        req.body
    );

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

const changePassword = catchAsynch(async (req: Request, res: Response) => {
    const result = await authServices.changePassword(
        (req as any).user._id,
        req.body
    );

    return sendSuccessResponse(
        res,
        result,
        "Password changed successfully",
        200
    );
});

const forgotPassword = catchAsynch(async (req, res) => {
    const result = await authServices.forgotPassword(req.body.email);
  
    sendSuccessResponse(res, result, "Check your email for reset link");
  });

const refresh = catchAsynch(async (req: Request, res: Response) => {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) throw new AppError(403, "refresh token not found");

    const { accessToken } = await authServices.refresh(refreshToken);

    if (!accessToken) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.status(403).json({
            success: false,
            message: "Session expired. Please log in again.",
        });
    }

    return sendSuccessResponse(
        res,
        { accessToken },
        "token refreshed successfully",
        200
    );
});

const logOut = catchAsynch(async (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    return sendSuccessResponse(res, {}, "User logged out successfully", 200);
});

const resetPassword = catchAsynch(async (req: Request, res: Response) => {
    const { id, token, newPassword } = req.body;
    const result = await authServices.resetPassword({ id, token, newPassword });
    return sendSuccessResponse(res, result, "Password reset successfully", 200);
});

export const authControllers = {
    getMe,
    logIn,
    changePassword,
    forgotPassword,
    refresh,
    logOut,
    resetPassword,
};
