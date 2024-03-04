/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import catchAsynch from "../../utls/catchAsynch";
import { USER_ROLE } from "../modules/user/user.constants";
import AppError from "../errors/AppError";
import { jwtToken } from "../../utls/jwtToken";
import { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user.model";

const checkAuth = (...roles: Array<keyof typeof USER_ROLE>) => {
  
    console.log(roles);
    return catchAsynch(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        console.log(token);

        if (!token) {
            throw new AppError(401, "Unauthorized access");
        }

        const decodedToken = jwtToken.verifyToken(token,"r7$9W#p2zYv6*QtF!xZs@bC5nG8h+JmN" );
        (req as any).user = decodedToken as JwtPayload;

        const { email } = decodedToken as JwtPayload;

        const user = await User.findOne({ email });

        // Authentication
        if (!user) {
            throw new Error("Invalid email or password");
        }

        //Authorization
        if (!roles.includes(user?.role)) {
            throw new Error("You are not authorized to create user");
        }

        next();
    });
};

export default checkAuth;
