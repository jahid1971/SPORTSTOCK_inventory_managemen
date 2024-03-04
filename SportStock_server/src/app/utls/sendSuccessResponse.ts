import { Response } from "express";

type TResponse<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
};
const sendSuccessResponse = <T>(res: Response, data: T, message: string, statusCode?: number) => {
    const status = statusCode  ? statusCode : 200;

    const responseData: TResponse<T> = {
        success: true,
        statusCode: status,
        message: message,
        data: data,
    };
    
    return status !== 200 ? res.status(status).json(responseData) : res.status(200).json(responseData);
};

export default sendSuccessResponse;
