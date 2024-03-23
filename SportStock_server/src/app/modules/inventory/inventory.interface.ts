import { ObjectId } from "mongoose";

export interface IInventory {
    product_id:ObjectId;
    branch_id:ObjectId;
    quantity:number;
    price:number;
    createdBy?:ObjectId;
}