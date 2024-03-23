import { Types } from "mongoose";

/* eslint-disable no-unused-vars */
export interface IProduct {
    productName: string;
    productPrice: number;
    productQuantity: number;
    productBranch: string;
    sportType?: Types.ObjectId;
    brand?: string;
    material?: MaterialType;
    color?: string;
    size?: "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
    condition?: ConditionType;
    weight?: string;
    style?: string;
}

// export enum SportType {
//     CRICKET = "cricket",
//     FOOTBALL = "football",
//     SOCCER = "soccer",
//     BASKETBALL = "basketball",
//     TENNIS = "tennis",
//     RUNNING = "running",
//     FITNESS = "fitness",
//     SWIMMING = "swimming",
//     GOLF = "golf",
//     YOGA = "yoga",
//     HIKING = "hiking",
// }


export enum MaterialType {
    LEATHER = "Leather",
    SYNTHETIC = "Synthetic",
    FABRIC = "Fabric",
    PLASTIC = "Plastic",
    METAL = "Metal",
    WOOD = "Wood",
}

export enum ConditionType {
    NEW = "New",
    USED = "Used",
}
