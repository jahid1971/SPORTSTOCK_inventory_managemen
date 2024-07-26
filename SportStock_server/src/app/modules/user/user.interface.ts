export type TUserRole = "seller" | "branchManager" | "superAdmin" | "admin";

export interface IUser {
    _id: string;
    id: string;
    fullName: string;
    email: string;
    userPhoto?: string;
    password: string;
    passwordChangedAt?: {
        getTime(): unknown;
        type: Date;
    };
    needsPasswordChange: boolean;
    branch?: string;
    role: TUserRole;
    status: "active" | "blocked" | "pending";
    contactNumber: string;
    address: string;
    isDeleted: boolean;
}
