export interface IUser {
    id: string;
    fullName: string;
    email: string;
    password: string;
    passwordChangedAt?: {
        getTime(): unknown;
        type: Date;
    };
    needsPasswordChange: boolean;
    branch?: string;
    role: "seller" | "branchManager" | "superAdmin";
    status: "active" | "blocked" | "pending";
    isDeleted: boolean;
}
