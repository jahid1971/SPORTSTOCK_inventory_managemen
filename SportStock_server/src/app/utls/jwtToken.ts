import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";

const createToken = (
    jwtPayload: JwtPayload,
    secret: string,
    options: {
        expiresIn: string;
    }
) => {
    return jwt.sign(jwtPayload, secret, options);
};

const verifyToken = (token: string, secret: string) => {
    let decoded;
    try {
        decoded = jwt.verify(token, secret as string) as JwtPayload;
    } catch (error) {
        throw new AppError(401, "Unauthorized !");
    }
    return decoded;
};

export const jwtToken = {
    createToken,
    verifyToken,
};
