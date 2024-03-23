export type TProduct = {
    _id: string;
    productName: string;
    price: number;
    sportType: string;
    brand: string;
    size: string;
    colour: string;
    material: string;
    branch: string;
    quantity: number;
    createdAt?: string;
    isDeleted?: boolean;
};

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
