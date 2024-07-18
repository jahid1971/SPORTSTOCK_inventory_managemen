import { Types } from "mongoose";

/* eslint-disable no-unused-vars */

export interface IVariant {
    _id?: Types.ObjectId;
    size?: string;
    color?: string;
    material?: string;
    condition?: string;
}

export interface IProduct {
    _id?: Types.ObjectId;
    productName: string;
    category: Types.ObjectId;
    price?: number;
    productCode: string;
    image?: string;
    brand?: string;
    description?: string;
    variants?: IVariant[];
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// export enum Category {
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

// export enum MaterialType {
//     LEATHER = "leather",
//     SYNTHETIC = "synthetic",
//     FABRIC = "fabric",
//     PLASTIC = "Plastic",
//     METAL = "metal",
//     WOOD = "wood",
// }

// export enum ConditionType {
//     NEW = "new",
//     USED = "used",
// }
