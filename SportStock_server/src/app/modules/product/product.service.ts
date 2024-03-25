import { sendImageToCloudinary } from "../../utls/sendImageToCloudinary";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const createProduct = async (file: any, payload: IProduct) => {
    const imageName = payload.productName;
    const productImage = await sendImageToCloudinary(imageName, file?.path);

    payload.image = productImage?.secure_url as string;
    payload.isDeleted = false;

    const result = await Product.create(payload);
    console.log(payload, "payload");
    return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
    const queryObject = { ...query };
    const result = Product.find(queryObject).populate("branch", "_id branchName");
    return result;
};

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
