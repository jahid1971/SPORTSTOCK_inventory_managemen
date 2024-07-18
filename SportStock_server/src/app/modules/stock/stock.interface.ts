import { ObjectId } from "mongodb";

export interface IStock {
    _id: ObjectId;
    branchId: string;
    productId: string;
    quantity: number;
    updatedAt?: Date;
    isDeleted?: boolean;
}
