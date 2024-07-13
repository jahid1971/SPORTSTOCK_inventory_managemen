import { ICategory } from "./category.interface";
import { Category } from "./category.model";



const createCategory = async (payload: ICategory) => {
    payload.status = "active";
    payload.isDeleted = false;
    const result = await Category.create(payload);
    return result;
};

const getAllCategory = async () => {
    const result = await Category.find({ });
    return result;

}

export const categoryServices = {
    createCategory,
    getAllCategory
};
