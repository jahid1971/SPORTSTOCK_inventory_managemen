import AppError from "../../errors/AppError";
import getAllItems from "../../utls/getAllItems";
import { IUser } from "../user/user.interface";
import { IBranch } from "./branch.interface";
import { Branch } from "./branch.model";

const createBranch = async (payload: IBranch) => {
    const branch = await Branch.findOne({
        branchName: payload.branchName,
        isDeleted: false,
    });
    if (branch) throw new AppError(403, "Branch already exists");

    payload.isDeleted = false;
    payload.status = "active";
    const result = await Branch.create(payload);
    return result;
};

const getAllBranches = async (user: IUser, query: any) => {
    // if (
    //     user?.role === userRole.BRANCH_MANAGER ||
    //     user?.role === userRole.SELLER
    // ) {
    //     result = await Branch.find({ _id: user.branch });
    // } else result = await Branch.find({});

    const result = await getAllItems(Branch, query, {
        filterableFields: ["status"],
    });

    return result;
};

const updateBranchStatus = async (branchId: string, status: string) => {
    const result = await Branch.findByIdAndUpdate(
        { _id: branchId },
        { status },
        { new: true }
    );
    return result;
};

const deleteBranch = async (branchId: string) => {
    const result = await Branch.findByIdAndUpdate(
        branchId,
        { isDeleted: true },
        { new: true }
    );
    return result;
};

export const BranchServices = {
    createBranch,
    getAllBranches,
    updateBranchStatus,
    deleteBranch,
};
