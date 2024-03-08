import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const updateSellerStatus = async (id: string, payload: Partial<IUser>) => {
    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

export const sellerServices = {
    updateSellerStatus,
};
