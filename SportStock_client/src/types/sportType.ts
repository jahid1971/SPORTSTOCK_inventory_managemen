export type TSportType = {
    _id: string;
    sportType: string;
    status: "active" | "inactive";
    createdAt: string;
    isDeleted?: boolean;
};
