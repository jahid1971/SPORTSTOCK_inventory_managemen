export interface IBranch {
    branchName: string;
    location: string;
    status?: "active" | "inactive";
    isDeleted?: boolean;
}
