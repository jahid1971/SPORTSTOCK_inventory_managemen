/* eslint-disable @typescript-eslint/no-explicit-any */
import { userRole } from "./../../constants/user";

import { IProduct } from "./product.interface";
import Product from "./product.model";
import getAllItems from "../../utls/getAllItems";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utls/sendImageToCloudinary";
import { IUser } from "../user/user.interface";
import mongoose from "mongoose";
import sharp from "sharp";
import { generateProductCode } from "../../utls/utls.global";

const createProduct = async (file: any, payload: IProduct) => {
    const imageName = payload.productName;
    if (file) {
        const optimizedBuffer = await sharp(file.buffer)
            .resize({ width: 240 })
            .webp({ quality: 60 })
            .toBuffer();

        const productImage = await sendImageToCloudinary(
            imageName,
            optimizedBuffer
        );

        payload.image = (productImage as any)?.secure_url;
    }
    payload.isDeleted = false;

    if (!payload.productCode) {
        const productCode = generateProductCode();
        payload.productCode = productCode;
    }

    console.log("payload_______________________-", payload);

    const result = await Product.create(payload);

    return result;
};

const getAllProducts = async (user: IUser, query: Record<string, unknown>) => {
    if (query?.minQuantity || query?.maxQuantity) {
        query.quantity = {
            $gte: Number(query?.minQuantity) || 0,
            $lte: Number(query?.maxQuantity) || Infinity,
        };
    }
    if (query?.minPrice || query?.maxPrice) {
        query.price = {
            $gte: Number(query?.minPrice) || 0,
            $lte: Number(query?.maxPrice) || Infinity,
        };
    }

    if (
        user.role === userRole.SELLER ||
        user.role === userRole.BRANCH_MANAGER
    ) {
        const branch = user?.branch;
        query.branch = branch;
    }

    const allProducts = await getAllItems<IProduct>(Product, query, {
        searchableFields: ["productName", "description"],
        filterableFields: [
            "status",
            "branch",
            "price",
            "branch",
            "quantity",
            "branch",
            "condition",
        ],
        // populate: {
        //     path: "branch",
        //     select: "_id branchName",
        // },
    });


    return allProducts;
};

const getSingleProduct = (id: string) => {
    const result = Product.findById(id);
    return result;
};

const updateProduct = (id: string, payload: Partial<IProduct>) => {
    delete payload._id;
    const result = Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteProduct = async (productId: string) => {
    const result = await Product.findByIdAndUpdate(
        productId,
        { isDeleted: true },
        { new: true }
    );

    if (!result) throw new AppError(404, "Update failed, product not found");

    return result;
};

const multiProductDelete = async (productIds: string[]) => {
    const ids = productIds.map((id) => new mongoose.Types.ObjectId(id));
    const result = await Product.updateMany(
        { _id: { $in: ids } },
        { isDeleted: true }
    );
    // const ids = productIds.map((id) => new mongoose.Types.ObjectId(id) );
    // const result = await Product.updateMany({ _id: { $in: ids }, isDeleted: true });
    return result;
};

const getDashboardMeta = async (user: IUser) => {
    const totalProducts = await Product.countDocuments({ isDeleted: false });

    const totalItems = await Product.aggregate([
        {
            $match: {
                isDeleted: false,
            },
        },

        {
            $group: {
                _id: null,
                totalQuantity: { $sum: "$quantity" },
                // totalPrice: { $sum: "$price" },
                totalStockValue: {
                    $sum: { $multiply: ["$quantity", "$price"] },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                totalStockValue: 1,
            },
        },
    ]);

    console.log("totalItems", totalItems);

    const totalQuantity = totalItems[0]?.totalQuantity || 0;
    const totalStockValue = totalItems[0]?.totalStockValue || 0;

    console.log(totalQuantity, totalStockValue);

    return {
        totalProducts,
        totalQuantity,
        totalStockValue,
    };
};

const stockAvailability = async () => {
    const result = await Product.aggregate([
        {
            $match: {
                isDeleted: false,
            },
        },
        {
            $group: {
                _id: "$productName",
                totalItems: { $sum: "$quantity" },
            },
        },

        {
            $project: {
                _id: 0,
                productName: "$_id",
                totalItems: 1,
            },
        },
    ]);

    return result;
};

export const productServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    multiProductDelete,
    getDashboardMeta,
    stockAvailability,
};
