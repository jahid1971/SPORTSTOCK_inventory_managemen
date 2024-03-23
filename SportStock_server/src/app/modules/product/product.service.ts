import { IProduct, ISportType } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: IProduct) => {
    const result = await Product.create(payload);
    return result;
};


export const productServices = {
    createProduct,
};
