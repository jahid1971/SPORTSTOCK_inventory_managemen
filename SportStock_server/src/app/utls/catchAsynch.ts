import { NextFunction, Request, RequestHandler, Response } from "express";
import { IUser } from "../modules/user/user.interface";

declare module "express-serve-static-core" {
    interface Request {
        user: IUser;
    }
}


const catchAsynch = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => { 
            console.log( err, 'error in catchAsynch ');
            next(err);
        });
    };
};
export default catchAsynch;
