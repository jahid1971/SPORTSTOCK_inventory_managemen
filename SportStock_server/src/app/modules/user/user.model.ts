import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        passwordChangedAt: { type: Date },
        branch: { type: String },
        role: { type: String, enum: ["seller", "branchManager", "superAdmin"], required: true },
    },
    { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
