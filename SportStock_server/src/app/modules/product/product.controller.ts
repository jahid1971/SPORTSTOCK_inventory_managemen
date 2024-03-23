import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { productServices } from "./product.service";

const createProduct = catchAsynch(async (req, res) => {
    const result = await productServices.createProduct(req.body);
    return sendSuccessResponse(res, result, "Product added successfully", 201);
});
export const productControllers = {
    createProduct,
};
