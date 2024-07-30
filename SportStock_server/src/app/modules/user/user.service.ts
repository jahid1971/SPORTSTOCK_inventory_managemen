/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import User from "./user.model";
import AppError from "../../errors/AppError";
import {
    generateBranchManagerId,
    generateSellerId,
    convertToObjectId,
    generateAdminId,
} from "../../utls/utls.global";
import { passwordHash } from "../../utls/passwordHash";
import { userRole } from "../../constants/user";
import { sendImageToCloudinary } from "../../utls/sendImageToCloudinary";
import getAllItems from "../../utls/getAllItems";
import sharp from "sharp";

const createAdmin = async (file: any, payload: IUser) => {
    const user = await User.findOne({ email: payload.email });
    if (user)
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Admin is already created with this email"
        );
    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 100 })
            .toBuffer();

        const imageName = payload.fullName;
        const userPhoto = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

        payload.userPhoto = (userPhoto as any)?.secure_url;
    }
    const password = payload.password ? payload.password : "admin456";
    const hashedPassword = await passwordHash.hashPassword(password);
    payload.password = hashedPassword;
    payload.role = userRole.ADMIN;
    payload.status = "active";
    payload.needsPasswordChange = true;
    payload.isDeleted = false;
    payload.id = await generateAdminId();
    const result = await User.create(payload);
    const userObject = (result as any).toObject();
    delete (userObject as any).password;
    return userObject;
};

const createSeller = async (file: any, payload: IUser) => {
    const user = await User.findOne({ email: payload.email });
    if (user)
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Seller is already created with this email"
        );

    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 100 })
            .toBuffer();

        const imageName = payload.fullName;
        const userPhoto = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

        payload.userPhoto = (userPhoto as any)?.secure_url;
    }

    const password = payload.password ? payload.password : "seller456";
    const hashedPassword = await passwordHash.hashPassword(password);

    payload.password = hashedPassword;
    payload.role = userRole.SELLER;
    payload.status = "active";
    payload.needsPasswordChange = true;
    payload.isDeleted = false;
    payload.id = await generateSellerId();

    console.log("payload -------------", payload);

    const result = await User.create(payload);
    const userObject = (result as any).toObject();
    delete (userObject as any).password;
    return userObject;
};

const updateSeller = async (
    id: string,
    file: any,
    payload: Partial<IUser> = {}
) => {
    const seller = await User.findById(id);

    if (!seller || seller.role !== "seller") {
        throw new AppError(404, "Seller not found");
    }

    // Handle profile photo update
    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 100 })
            .toBuffer();

        const imageName = payload.fullName || seller.fullName;
        const userPhoto = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

        payload.userPhoto = (userPhoto as any)?.secure_url;
    }

    // Handle password update
    if (payload.password) {
        const hashedPassword = await passwordHash.hashPassword(
            payload.password
        );
        payload.password = hashedPassword;
    }

    const updatedSeller = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!updatedSeller) {
        throw new AppError(500, "Failed to update seller");
    }

    const userObject = updatedSeller.toObject();
    delete userObject.password;

    return userObject;
};

const updateAdmin = async (
    id: string,
    file: any,
    payload: Partial<IUser> = {}
) => {
    const admin = await User.findById(id);

    if (!admin || admin.role !== userRole.ADMIN) {
        throw new AppError(404, "Admin not found");
    }

    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 100 })
            .toBuffer();

        const imageName = payload.fullName || admin.fullName;
        const userPhoto = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

        payload.userPhoto = (userPhoto as any)?.secure_url;
    }

    if (payload.password) {
        const hashedPassword = await passwordHash.hashPassword(
            payload.password
        );
        payload.password = hashedPassword;
    }

    const updatedAdmin = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!updatedAdmin) {
        throw new AppError(500, "Failed to update admin");
    }

    const userObject = updatedAdmin.toObject();
    delete userObject.password;

    return userObject;
};

const updateBranchManager = async (
    id: string,
    file: any,
    payload: Partial<IUser> = {}
) => {
    const bm = await User.findById(id);

    if (!bm || bm.role !== userRole.BRANCH_MANAGER) {
        throw new AppError(404, "Branch manager not found");
    }

    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 100 })
            .toBuffer();

        const imageName = payload.fullName || bm.fullName;
        const userPhoto = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

        payload.userPhoto = (userPhoto as any)?.secure_url;
    }

    if (payload.password) {
        const hashedPassword = await passwordHash.hashPassword(
            payload.password
        );
        payload.password = hashedPassword;
    }

    const updatedBM = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });

    if (!updatedBM) {
        throw new AppError(500, "Failed to update branch manager");
    }

    const userObject = updatedBM.toObject();
    delete userObject.password;

    return userObject;
};

const createBranchManager = async (file: any, payload: IUser) => {
    const user = await User.findOne({ email: payload.email });
    if (user)
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Branch manager is already created with this email"
        );

    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 100 })
            .toBuffer();

        const imageName = payload.fullName;
        const userPhoto = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

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

const getAllUsers = async (user: IUser, query: Record<string, unknown>) => {
    let withoutRoles;

    if (user.role === userRole.SUPER_ADMIN) {
        withoutRoles = [];
    } else if (user.role === userRole.ADMIN) {
        withoutRoles = [userRole.SUPER_ADMIN, userRole.ADMIN];
    } else if (user.role === userRole.BRANCH_MANAGER) {
        withoutRoles = [
            userRole.SUPER_ADMIN,
            userRole.ADMIN,
            userRole.BRANCH_MANAGER,
        ];
    }

    const pipeline = [
        {
            $match: {
                isDeleted: false,
                role: { $nin: withoutRoles },
            },
        },

        {
            $lookup: {
                from: "branches",
                localField: "branch",
                foreignField: "_id",
                as: "branch",
            },
        },
        {
            $unwind: {
                path: "$branch",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                password: 0,
            },
        },
    ];

    convertToObjectId(query, "branch", { nested: true });

    const result = await getAllItems<IUser>(User, query, {
        searchableFields: ["fullName", "branch.branchName", "id"],
        filterableFields: ["role", "status", "branch._id"],
        mode: "aggregate",
        aggregationPipeline: pipeline,
    });

    return result;
};

const updateUserStatus = async (
    id: string,
    payload: Partial<IUser>,
    currentUser: IUser
) => {
    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
        throw new AppError(404, "User not found");
    }

    if (userToUpdate?.role === userRole.SUPER_ADMIN) {
        throw new AppError(403, "Super admin status cannot be updated");
    }

    if (currentUser.role === userRole.ADMIN) {
        if (
            userToUpdate.role === (userRole.SUPER_ADMIN as string) ||
            userToUpdate.role === userRole.ADMIN
        ) {
            throw new AppError(
                403,
                `You are not authorized to update  user's status !!`
            );
        }
    } else if (currentUser.role === userRole.BRANCH_MANAGER) {
        if (
            userToUpdate.role === (userRole.SUPER_ADMIN as string) ||
            userToUpdate.role === userRole.ADMIN ||
            userToUpdate.role === userRole.BRANCH_MANAGER
        ) {
            throw new AppError(
                403,
                "You are not authorized to update this user's status"
            );
        }
    } else if (currentUser.role === userRole.SELLER) {
        throw new AppError(403, "You are not authorized to update user status");
    }

    const result = await User.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteUser = async (id: string) => {
    const generatedId = "deletedUser";
    const result = await User.findByIdAndUpdate(
        id,
        { isDeleted: true, id: generatedId },
        { new: true }
    );
    return result;
};

const getUserById = async (id: string) => {
    const user = await User.findById(id).populate({
        path: "branch",
        select: "_id branchName",
    });

    if (!user || user.isDeleted) {
        throw new AppError(404, "User not found or has been deleted");
    }

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

export const userServices = {
    createAdmin,
    createSeller,
    updateSeller,
    updateAdmin,
    updateBranchManager,
    getAllUsers,
    updateUserStatus,
    createBranchManager,
    deleteUser,
    getUserById,
};
