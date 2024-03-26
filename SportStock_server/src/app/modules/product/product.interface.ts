import { Types } from "mongoose";

/* eslint-disable no-unused-vars */
export interface IProduct {
    productName: string;
    price: number;
    quantity: number;
    branch: string;
    sportType?: Types.ObjectId;
    brand?: string;
    material?: MaterialType;
    color?: string;
    size?: "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
    condition?: ConditionType;
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
    LEATHER = "leather",
    SYNTHETIC = "synthetic",
    FABRIC = "fabric",
    PLASTIC = "Plastic",
    METAL = "metal",
    WOOD = "wood",
}

export enum ConditionType {
    NEW = "new",
    USED = "used",
}
