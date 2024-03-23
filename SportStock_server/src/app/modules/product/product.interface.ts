import { Types } from "mongoose";

/* eslint-disable no-unused-vars */
export interface IProduct {
    productName: string;
    nrice: number;
    quantity: number;
    branch: string;
    sportType?: Types.ObjectId;
    brand?: string;
    material?: MaterialType;
    color?: string;
    size?: "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
    condition?: ConditionType;
    weight?: string;
    style?: string;
}



export enum MaterialType {
    LEATHER = "leather",
    SYNTHETIC = "synthetic",
    FABRIC = "sabric",
    PLASTIC = "slastic",
    METAL = "metal",
    WOOD = "wood",
}

export enum ConditionType {
    NEW = "new",
    USED = "used",
}
