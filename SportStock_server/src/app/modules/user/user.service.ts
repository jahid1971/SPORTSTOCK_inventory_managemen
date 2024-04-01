import httpStatus from "http-status";
import { IUser } from "./user.interface";
import User from "./user.model";
import AppError from "../../errors/AppError";
import { generateSellerId } from "../../utls/utls.global";
import { passwordHash } from "../../utls/passwordHash";

const registerSeller = async (payload: IUser) => {
    let user = await User.findOne({ email: payload.email });
    if (user) {
        if (user.status === "pending") {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "You have already sent a request , please wait for approval"
            );
        }
        if (user.status === "active") {
            throw new AppError(httpStatus.BAD_REQUEST, "You are already a registered seller");
        }
    }
    payload.role = "seller";
    payload.status = "pending";
    payload.isDeleted = false;
    payload.id = await generateSellerId();

    const { password, ...remainingPayLoad } = payload;

    const hashedPassword = await passwordHash.hashPassword(password);

    const result = await User.create({ ...remainingPayLoad, password: hashedPassword });
    user = (result as any).toObject();
    
    delete (user as IUser).password;
    return user;
};

const getAllUsers = (query: Record<string, unknown>) => {
    const queryObject = { ...query };
    const result = User.find({});
    return result;
};

const updateUserStatus = async (id: string, payload: Partial<IUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

export const userServices = {
    registerSeller,
    getAllUsers,
    updateUserStatus,
};
