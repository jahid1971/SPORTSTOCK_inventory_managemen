import { userRole } from "../../constants/user";
import { IUser } from "../user/user.interface";
import { IBranch } from "./branch.interface";
import { Branch } from "./branch.model";

const createBranch = async (payload: IBranch) => {
    payload.isDeleted = false;
    payload.status = "active";
    const result = await Branch.create(payload);
    return result;
};

const getAllBranches = async (user: IUser) => {
    let result;

    if (user?.role === userRole.BRANCH_MANAGER || user?.role === userRole.SELLER) {
        result = await Branch.find({ _id: user.branch });
    } else result = await Branch.find({});

    return result;
};

export const BranchServices = {
    createBranch,
    getAllBranches,
};
