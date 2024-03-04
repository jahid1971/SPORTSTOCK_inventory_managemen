import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { productServices } from "./product.service";

const addProduct = catchAsynch(async (req, res) => {
    const result = await productServices.addProduct(req.body);
    return sendSuccessResponse(res, result, "Product added successfully", 201);
});
export const productControllers = {
    addProduct,
};
