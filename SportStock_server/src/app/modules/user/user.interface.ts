export type TUserRole = "seller" | "branchManager" | "superAdmin";

export interface IUser {
    _id: string;
    id: string;
    fullName: string;
    email: string;
    password?: string;
    passwordChangedAt?: {
        getTime(): unknown;
        type: Date;
    };
    needsPasswordChange: boolean;
    branch?: string;
    role: TUserRole
    status: "active" | "blocked" | "pending";
    isDeleted: boolean;
}
