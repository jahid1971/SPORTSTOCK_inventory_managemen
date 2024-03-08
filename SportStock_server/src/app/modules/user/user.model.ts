import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        id: { type: String, required: true, unique: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        passwordChangedAt: { type: Date },
        needsPasswordChange: { type: Boolean, default: false },
        role: { type: String, enum: ["seller", "branchManager", "superAdmin"], required: true },
        branch: {
            type: String,
            required: function () {
                return this.role === "branchManager" || this.role === "seller";
            },
        },
        status: { type: String, enum: ["active", "blocked", "pending"], required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);


// filter out deleted documents
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });
  

const User = model<IUser>("User", userSchema);
export default User;
