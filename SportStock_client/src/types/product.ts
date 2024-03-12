export type TSportType = {
    _id: string;
    sportType: string;
    status: "active" | "inactive";
    createdAt?: string;
    isDeleted?: boolean;
};
export type TBrand = {
    _id: string;
    brandName: string;
    createdAt?: string;
    isDeleted?: boolean;
};
