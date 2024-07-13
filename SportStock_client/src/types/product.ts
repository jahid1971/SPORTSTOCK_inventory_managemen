/* eslint-disable @typescript-eslint/no-explicit-any */
export type TProduct = {
    _id?: string;
    image: any;
    productName: string;
    price: number;
    category: string;
    brand: string;
    size: string;
    color: string;
    material: string;
    branch: TBranch;
    quantity: number;
    createdAt?: string;
    isDeleted?: boolean;
};
export type TBranch = {
    _id: string;
    branchName: string;
};

export type TCategory = {
    _id: string;
    category: string;
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
