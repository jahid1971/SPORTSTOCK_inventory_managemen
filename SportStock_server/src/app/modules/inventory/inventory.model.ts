import { Schema, Types, model } from "mongoose";
import { IInventory } from "./inventory.interface";

const InventorySchema = new Schema<IInventory>({
    product_id: { type: Types.ObjectId, required: true },
    branch_id: { type: Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    createdBy: { type: Types.ObjectId },
});

export const Inventory = model<IInventory>("Inventory", InventorySchema);
