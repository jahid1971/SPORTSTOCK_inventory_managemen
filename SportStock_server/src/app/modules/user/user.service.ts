/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import User from "./user.model";
import AppError from "../../errors/AppError";
import { generateBranchManagerId, generateSellerId } from "../../utls/utls.global";
import { passwordHash } from "../../utls/passwordHash";
import { userRole } from "../../constants/user";
import { sendImageToCloudinary } from "../../utls/sendImageToCloudinary";

const createSeller = async (file: any, payload: IUser) => {
    const user = await User.findOne({ email: payload.email });
    if (user) throw new AppError(httpStatus.BAD_REQUEST, "Seller is already created with this email");

    if (file) {
        const imageName = payload.fullName;
        const userPhoto = await sendImageToCloudinary(imageName, file?.buffer);

        if (userPhoto) payload.userPhoto = (userPhoto as any)?.secure_url;
    }

    const password = payload.password ? payload.password : "seller456";
    const hashedPassword = await passwordHash.hashPassword(password);

    payload.password = hashedPassword;
    payload.role = userRole.SELLER;
    payload.status = "active";
    payload.needsPasswordChange = true;
    payload.isDeleted = false;
    payload.id = await generateSellerId();

    const result = await User.create(payload);
    const userObject = (result as any).toObject();
    delete (userObject as any).password;
    return userObject;
};

const createBranchManager = async (file: any, payload: IUser) => {
    const user = await User.findOne({ email: payload.email });
    if (user) throw new AppError(httpStatus.BAD_REQUEST, "Branch manager is already created with this email");

    if (file) {
        const imageName = payload.fullName;
        const userPhoto = await sendImageToCloudinary(imageName, file?.buffer);

        if (userPhoto) payload.userPhoto = (userPhoto as any)?.secure_url;
    }

    const password = payload.password ? payload.password : "bm456";

    const hashedPassword = await passwordHash.hashPassword(password);

    payload.password = hashedPassword;
    payload.role = userRole.BRANCH_MANAGER;
    payload.status = "active";
    payload.needsPasswordChange = true;
    payload.isDeleted = false;
    payload.id = await generateBranchManagerId();

    const result = await User.create(payload);
    const userObject = (result as any).toObject();
    delete (userObject as any).password;
    return userObject;
};

const getAllUsers = (user: IUser, query: Record<string, unknown>) => {
    const queryObject = { ...query };
    if (user.role === userRole.BRANCH_MANAGER) {
        queryObject.role = userRole.SELLER;
        queryObject.branch = user.branch;
    }
    const result = User.find({ ...queryObject });
    return result;
};

const updateUserStatus = async (id: string, payload: Partial<IUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteUser = async (id: string) => {
    const generatedId = "deletedUser";
    const result = await User.findByIdAndUpdate(id, { isDeleted: true, id: generatedId }, { new: true });
    return result;
};

export const userServices = {
    createSeller,
    getAllUsers,
    updateUserStatus,
    createBranchManager,
    deleteUser,
};
