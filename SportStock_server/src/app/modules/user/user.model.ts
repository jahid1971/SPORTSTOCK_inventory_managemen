import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        id: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        userPhoto: {
            type: String,
            default:
                "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
        },
        password: { type: String, required: true, select: false },
        passwordChangedAt: { type: Date },
        needsPasswordChange: { type: Boolean, required: true, default: false },
        role: {
            type: String,
            enum: ["seller", "branchManager", "superAdmin", "admin"],
            required: true,
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            required: function () {
                return this.role === "branchManager" || this.role === "seller";
            },
            ref: "Branch",
        },
        status: {
            type: String,
            enum: ["active", "blocked", "pending"],
            required: true,
        },
        contactNumber: { type: String, required: true },
        address: { type: String, required: true },
        isDeleted: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
);

// filter out deleted documents
userSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
   

    next();
});

userSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

const User = model<IUser>("User", userSchema);
export default User;
