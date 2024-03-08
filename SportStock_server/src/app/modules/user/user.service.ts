import { IUser } from "./user.interface";
import User from "./user.model";

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
    getAllUsers, updateUserStatus
};
