/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { passwordHash } from "../../utls/passwordHash";

import User from "../user/user.model";
import { jwtToken } from "../../utls/jwtToken";
import config from "../../config";
import emailSender from "../../utls/emailSender";

const getMe = async (refreshToken: string) => {
    if (!refreshToken) throw new AppError(403, "unauthorized access!!!");

    const verifiedToken = jwtToken.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
    );

    if (!verifiedToken.id) throw new AppError(403, "invalid refresh token");

    const user = await User.findById(verifiedToken.id);

    const jwtPayload = {
        id: user?._id,
        role: user?.role,
        email: user?.email,
        iat: Math.floor(Date.now() / 1000),
    };

    const newAccessToken = jwtToken.createToken(
        jwtPayload,
        process.env.JWT_ACCESS_SECRET as string,
        process.env.JWT_ACCESS_EXPIRES_IN as string
    );

    const { password, createdAt, updatedAt, ...userObject } = (
        user as any
    ).toObject();

    return {
        accessToken: newAccessToken,
        userObject,
    };
};

// logIn......................logIn

const logIn = async (payload: { email: string; password: string }) => {
    const user = await User.findOne({ email: payload.email }).select(
        "+password"
    );

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const plainPassword = payload.password;
    const hashedPassword = user.password;

    const isPasswordMatched = await passwordHash.comparePassword(
        plainPassword,
        hashedPassword
    );

    if (!isPasswordMatched) throw new AppError(404, "Invalid password");

    const jwtPayload: JwtPayload = {
        id: user._id,
        role: user.role,
        email: user.email,
        iat: Math.floor(Date.now() / 1000),
    };

    const accessToken = jwtToken.createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expiry as string
    );

    const refreshToken = jwtToken.createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expiry as string
    );

    const { password, createdAt, updatedAt, ...userObject } = (
        user as any
    ).toObject();

    return { accessToken, refreshToken, userObject };
};

// changePassword......................changePassword
const changePassword = async (
    id: string,
    payload: { oldPassword: string; newPassword: string }
) => {
    const user = await User.findById(id).select("+password");

    if (!user) throw new AppError(404, "User not found");

    const isPasswordMatched = await passwordHash.comparePassword(
        payload.oldPassword,
        user?.password
    );
    if (!isPasswordMatched)
        throw new AppError(404, "Old Password Is Incorrect");

    const isOldAdnNewPasswordSame = await passwordHash.comparePassword(
        payload.newPassword,
        user?.password
    );
    if (isOldAdnNewPasswordSame)
        throw new AppError(404, "New password can't be same as old password");

    const hashedPassword = await passwordHash.hashPassword(payload.newPassword);

    const result = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword, needsPasswordChange: false },
        { new: true }
    );
    return result;
};

const refresh = async (refreshToken: string) => {
    const verifiedToken = jwtToken.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
    );

    if (!verifiedToken.id) throw new AppError(403, "invalid refresh token");

    const user = await User.findById(verifiedToken.id);

    const jwtPayload = {
        id: user?._id,
        role: user?.role,
        email: user?.email,
        iat: Math.floor(Date.now() / 1000),
    };

    const newAccessToken = jwtToken.createToken(
        jwtPayload,
        process.env.JWT_ACCESS_SECRET as string,
        process.env.JWT_ACCESS_EXPIRES_IN as string
    );

    return {
        accessToken: newAccessToken,
    };
};

const forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(404, "User not found");
    }


    const resetPassToken = jwtToken.createToken(
        { id: user._id },
        process.env.reset_pass_secret as string,
        process.env.reset_link_expires_in as string
    );


    const resetLink: string =
        process.env.reset_link + `?id=${user._id}&token=${resetPassToken}`;

  
    const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #007BFF;">Password Reset Request</h2>
                <p>Hi <strong>${user.role}</strong>,</p>
                <p>We received a request to reset the password for your account associated with this email.</p>
                <p>Please click the button below to reset your password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="text-decoration: none;">
                        <button style="padding: 12px 24px; background-color: #007BFF; border: none; border-radius: 5px; color: #fff; font-size: 16px; cursor: pointer;">
                            Reset Password
                        </button>
                    </a>
                </div>
                <p>If you did not request this, you can safely ignore this email. This password reset link will expire soon.</p>
                <p>Thanks,<br /><strong>Netra Health Care Team</strong></p>
            </div>
        </div>
    `;

    await emailSender(email, htmlContent);
};

const resetPassword = async (payload: {
    id: string;
    token: string;
    newPassword: string;
}) => {
    const user = await User.findById(payload.id).select("+password");

    const isTokenValid = jwtToken.verifyToken(
        payload.token,
        process.env.reset_pass_secret as string,
        "Reset Password Link"
    );

    if (!isTokenValid) throw new AppError(401, "Something went wrong");

    const hashedPassword = await passwordHash.hashPassword(
        payload.newPassword
    );

    // const result = await prisma.user.update({
    //     where: { id: user.id },
    //     data: {
    //         password: hashedPassword,
    //     },
    // });

    const result = await User.findByIdAndUpdate(
        payload.id,
        { password: hashedPassword, needsPasswordChange: false },
        { new: true }
    );

    return result;
};



export const authServices = {
    getMe,
    logIn,
    changePassword,
    refresh,
    forgotPassword,
    resetPassword,
};
