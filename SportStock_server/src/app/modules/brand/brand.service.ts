import { IBrand } from "./brand.interface";
import { Brand } from "./brand.model";

const createBrand = async (payload: IBrand) => {
    payload.isDeleted = false;
    const result = await Brand.create(payload);
    return result;
};

const getAllBrands = async () => {
    const result = await Brand.find({});
    return result;

}

export const BrandServices = {
    createBrand,
    getAllBrands
};
