import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { passwordHash } from "../../utls/passwordHash";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { jwtToken } from "../../utls/jwtToken";
import config from "../../config";

const regisration = async (payload: IUser) => {
    const { password, ...remainingPayLoad } = payload;

    const hashedPassword = await passwordHash.hashPassword(password);
    const result = await User.create({ ...remainingPayLoad, password: hashedPassword });
    const user = (result as any).toObject();
    delete user.password;
    return user;
};

// logIn......................logIn

const logIn = async (payload: { email: string; password: string }) => {
    const user = await User.findOne({ email: payload.email }).select("+password");

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const plainPassword = payload.password;
    const hashedPassword = user.password;

    const isPasswordMatched = await passwordHash.comparePassword(plainPassword, hashedPassword);

    if (!isPasswordMatched) {
        throw new AppError(404, "Invalid password");
    }

    const jwtPayload: JwtPayload = {
        id: user._id,
        role: user.role,
        email: user.email,
        iat: Math.floor(Date.now() / 1000),
    };

    const accessToken = jwtToken.createToken(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expiry as string,
    });

    const refreshToken = jwtToken.createToken(jwtPayload, config.jwt_refresh_secret as string, {
        expiresIn: config.jwt_refresh_expiry as string,
    });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...userObject } = (user as any).toObject();
    return { accessToken, refreshToken, userObject };
};

export const authServices = {
    regisration,
    logIn,
};
