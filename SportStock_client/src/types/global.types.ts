import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TUserRole = "seller" | "branchManager" | "superAdmin";

export type TUser = {
    userId: number;
    role: string | undefined;
    exp: number;
    iat: number;
};

export type TError = {
    data: {
        message: string;
        stack: string;
        success: boolean;
    };
    status: number;
};

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
};

export type TResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
    message: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
    name: string;
    value: boolean | React.Key;
};

// export type TFieldValues = Record<string, any>;
