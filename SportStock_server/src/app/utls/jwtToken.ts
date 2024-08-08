/* eslint-disable no-console */
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import AppError from "../errors/AppError";

const createToken = (
    jwtPayload: JwtPayload,
    secret: Secret,
    expireTime: string
) => {
    return jwt.sign(jwtPayload, secret, {
        // algorithm: 'HS256',
        expiresIn: expireTime,
    });
};

const verifyToken = (
    token: string,
    secret: string,
    tokenType: string = "Token"
) => {
    let decoded;
    try {
        decoded = jwt.verify(token, secret as string) as JwtPayload;
    } catch (error: any) {
        if (error?.name === "TokenExpiredError") {
            console.log("error in jwt verify token >>>>>>>>>>>>>>>>", error);

            throw new AppError(401, `${tokenType} has expired!!`, error);
        }
        throw new AppError(401, "Unauthorized access !", error);
    }
    return decoded;
};

export const jwtToken = {
    createToken,
    verifyToken,
};
