import { userRole } from "../constants/user";
import User from "../modules/user/user.model";

const findLastUser = async (userRole: string) => {
    const lastUser = await User.findOne(
        {
            role: userRole,
        },
        {
            id: 1,
            _id: 0,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastUser?.id ? lastUser.id : undefined;
};

export const generateSellerId = async () => {
    const lastSellerId = await findLastUser(userRole.SELLER);
    if (!lastSellerId) return "S-0001";

    const lastId = parseInt(lastSellerId.split("-")[1]);
    const currentSellerId = `S-${(lastId + 1).toString().padStart(4, "0")}`;
    return currentSellerId;
};

export const generateBranchManagerId = async () => {
    const lastBranchManagerId = await findLastUser(userRole.BRANCH_MANAGER);
    if (!lastBranchManagerId) return "BM-0001";

    const lastId = parseInt(lastBranchManagerId.split("-")[1]);
    const currentBranchManagerId = `BM-${(lastId + 1).toString().padStart(4, "0")}`;
    return currentBranchManagerId;
};

export const generateAdminId = async () => {
    const lastAdminId = await findLastUser(userRole.ADMIN);
    if (!lastAdminId) return "A-0001";
    const lastId = parseInt(lastAdminId.split("-")[1]);
    const currentAdminId = `A-${(lastId + 1).toString().padStart(4, "0")}`;
    return currentAdminId;
};

// export const generateProductCode = async () => {
//     const lastProductCode = await Product.findOne(
//         {},
//         {
//             productCode: 1,
//             category: 1,
//             _id: 0,
//         }
//     )
//         .sort({
//             createdAt: -1,
//         })
//         .lean();

//     if (!lastProductCode) return "P-00001";

//     const lastId = parseInt(lastProductCode.split("-")[1]);

//     const currentProductCode = `P-${(lastId + 1).toString().padStart(5, "0")}`;

//     return currentProductCode;
// };
export function generateProductCode() {
    const timestamp = Date.now().toString(36).slice(-6);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `pro-${timestamp}-${random}`;
}

import mongoose from "mongoose";

export const convertToObjectId = (
    query: Record<string, any>,
    originalField: string,
    options?: { nested?: boolean; targetField?: string }
) => {
    if (!query || typeof query !== "object") return; 

    const value = query[originalField];
    if (!value) return;

    const target =
        options?.targetField ||
        (options?.nested ? `${originalField}._id` : originalField);

    if (Array.isArray(value)) {
        query[target] = value
            .filter((id) => mongoose.Types.ObjectId.isValid(id))
            .map((id) => new mongoose.Types.ObjectId(id));
    } else if (
        typeof value === "string" &&
        mongoose.Types.ObjectId.isValid(value)
    ) {
        query[target] = new mongoose.Types.ObjectId(value);
    }

    // delete query[originalField];
};
