/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { productServices } from "./product.service";

const createProduct = catchAsynch(async (req, res) => {
    const result = await productServices.createProduct(req.file, req.body.data);
    return sendSuccessResponse(res, result, "Product added successfully", 201);
});
const getAllProducts = catchAsynch(async (req, res) => {
    const userRole = (req as any).user;
    const result = await productServices.getAllProducts(userRole, req.query);
    return sendSuccessResponse(res, result?.data, "All products fetched successfully", 200, result?.meta);
});

const getSingleProduct = catchAsynch(async (req, res) => {
    const result = await productServices.getSingleProduct(req.params.id);
    return sendSuccessResponse(res, result, "Product fetched successfully", 200);
});
const updateProduct = catchAsynch(async (req, res) => {
    const result = await productServices.updateProduct(req.params.id, req.body);
    return sendSuccessResponse(res, result, "Product updated successfully", 200);
});

const deleteProduct = catchAsynch(async (req, res) => {
    const result = await productServices.deleteProduct(req.params.id);

    return sendSuccessResponse(res, result, "Product deleted successfully", 200);
});

const multiProductDelete = catchAsynch(async (req, res) => {


    const result = await productServices.multiProductDelete(req.body);

    return sendSuccessResponse(res, result, "Products deleted successfully", 200);
});

const getDashboardMeta = catchAsynch(async (req, res) => {
    const result = await productServices.getDashboardMeta(req?.user);
    return sendSuccessResponse(res, result, "Dashboard meta fetched successfully", 200);
});

const stockAvailability = catchAsynch(async (req, res) => {
    const result = await productServices.stockAvailability();
    return sendSuccessResponse(res, result, "Stock availability fetched successfully", 200);
});
export const productControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    multiProductDelete,
    getDashboardMeta,
    stockAvailability,
    
};
