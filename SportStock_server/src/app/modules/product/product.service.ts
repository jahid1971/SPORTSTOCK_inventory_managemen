import mongoose, { PipelineStage } from "mongoose";
import { sendImageToCloudinary } from "../../utls/sendImageToCloudinary";
import { IProduct } from "./product.interface";
import Product from "./product.model";
import getAllItems from "../../utls/getAllItems";

const createProduct = async (file: any, payload: IProduct) => {
    const imageName = payload.productName;
    if (file) {
        const productImage = await sendImageToCloudinary(imageName, file?.path);

        payload.image = productImage?.secure_url as string;
    }
    payload.isDeleted = false;

    const result = await Product.create(payload);
    console.log(payload, "payload");
    return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
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

    const allProducts = getAllItems(
        Product,
        query,
        ["productName", "description"],
        ["minPrice", "maxPrice", "minQuantity", "maxQuantity"]
    );
    // const queryObject = { ...query };
    // const excludeFields = [
    //     "searchTerm",
    //     "page",
    //     "limit",
    //     "sortBy",
    //     "sortOrder",
    //     "minPrice",
    //     "maxPrice",
    //     "minQuantity",
    //     "maxQuantity",
    // ];
    // excludeFields.forEach((value) => delete queryObject[value]);

    // // const searchTerm = (query.searchTerm as string) || "";
    // const sortBy = (query?.sortBy as string) || "createdAt";
    // const sortOrder = query?.sortOrder === "desc" ? -1 : 1;
    // const page = Number(query?.page) || 1;
    // const limit = Number(query?.limit) || 10;
    // const searchableFields = ["productName", "description"];

    // if (query?.minQuantity || query?.maxQuantity) {
    //     queryObject.quantity = {
    //         $gte: Number(query?.minQuantity) || 0,
    //         $lte: Number(query?.maxQuantity) || Infinity,
    //     };
    // }
    // if (query?.minPrice || query?.maxPrice) {
    //     queryObject.price = {
    //         $gte: Number(query?.minPrice) || 0,
    //         $lte: Number(query?.maxPrice) || Infinity,
    //     };
    // }
    // if (query.searchTerm && typeof query.searchTerm === "string" && query.searchTerm.trim() !== "") {
    //     queryObject.$or = searchableFields.map((field) => ({
    //         [field]: { $regex: query.searchTerm, $options: "i" },
    //     }));
    // }

    // console.log(queryObject, "queryObject");

    // const result = await Product.find(queryObject)
    //     .skip((page - 1) * limit)
    //     .limit(limit)
    //     .sort({ [sortBy]: sortOrder })
    //     .populate("branch", "_id branchName");

    // const total = await Product.countDocuments(queryObject);
    // const totalPages = Math.ceil(total / limit);
    return allProducts;
};

// const getAllProducts = async (query: Record<string, unknown>) => {
//     const queryObject: Record<string, any> = { isDeleted:false, ...query };

//     const excludeFields = [
//         "searchTerm",
//         "page",
//         "limit",
//         "sortBy",
//         "sortOrder",
//         "minPrice",
//         "maxPrice",
//         "minQuantity",
//         "maxQuantity",
//     ];

//     excludeFields.forEach((value) => delete queryObject[value]);

//     if (query?.minQuantity || query?.maxQuantity) {
//         queryObject.quantity = {
//             $gte: Number(query?.minQuantity) || 0,
//             $lte: Number(query?.maxQuantity) || Infinity,
//         };
//     }
//     if (query?.minPrice || query?.maxPrice) {
//         queryObject.price = {
//             $gte: Number(query?.minPrice) || 0,
//             $lte: Number(query?.maxPrice) || Infinity,
//         };
//     }
//     if (query?.branch) {
//         if(Array.isArray(query.branch)) $in: query.branch;
//         else queryObject.branch = query.branch;
//     }

//     const searchTerm = (query.searchTerm as string) || "";
//     const sortBy = (query?.sortBy as string) || "createdAt";
//     const sortOrder = query?.sortOrder === "desc" ? -1 : 1;
//     let page = Number(query?.page) || 1;
//     let limit = Number(query?.limit) || 10;
//     let skip = (page - 1) * limit;
//     const searchableFields = ["productName", "description"];
//     const pipeline = [
//         {
//             $match: {
//                 $or: searchableFields.map((field) => ({
//                     [field]: { $regex: searchTerm, $options: "i" },
//                 })),
//                 ...queryObject,
//             },
//         },

//         {
//             $sort: { [sortBy]: sortOrder },
//         },
//         {
//             $lookup: {
//                 from: "branches",
//                 localField: "branch",
//                 foreignField: "_id",
//                 as: "branch",
//                 pipeline: [{ $project: { branchName: 1, _id: 1 } }],
//             },
//         },
//         { $unwind: "$branch" },
//         { $skip: skip },
//         { $limit: limit },
//     ];
//     const countPipeline = [...pipeline, { $count: "total" }];
//     const countResult = await Product.aggregate(countPipeline as PipelineStage[]);
//     const total = countResult.length ? countResult[0].total : 0;
//     const totalPages = Math.ceil(total / limit);

//     // pipeline.push({
//     //     $addFields: {
//     //         meta: {
//     //             page,
//     //             limit,
//     //             total: countResult.length ? countResult[0].total : 0,
//     //         },
//     //     },
//     // });

//     console.log(queryObject, "queryObject");
//     const result = await Product.aggregate(pipeline);
//     return { data: result, meta: { page, limit, total, totalPages } };
// };

const getSingleProduct = (id) => {
    const result = Product.findById(id);
    return result;
};

const updateProduct = (id: string, payload: Partial<IProduct>) => {
    delete payload._id;
    console.log(payload, "payload", id, "id");
    const result = Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteProduct = async (productId: string) => {
    const result = Product.findByIdAndUpdate(productId, { isDeleted: true }, { new: true });
    return result;
};

export const productServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
