import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TUserRole = "seller" | "branchManager" | "superAdmin";

export type TUser = {
    id?:string
    _id?: string;
    userPhoto?: string;
    userId: number;
    role: string | undefined;
    exp: number;
    iat: number;
    email?: string;
    password?: string;
    fullName?: string;
    status?: string
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
export type TBranch = {
    _id: string;
    branchName: string;
    location: string;
    status?: string;
    createdAt?: string;
    isDeleted?: boolean;
};

// export type TFieldValues = Record<string, any>;
