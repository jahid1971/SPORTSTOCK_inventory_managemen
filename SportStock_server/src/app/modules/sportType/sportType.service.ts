import { ISportType } from "./sportType.interface";
import { SportType } from "./sportType.model";



const createSportType = async (payload: ISportType) => {
    payload.status = "active";
    payload.isDeleted = false;
    const result = await SportType.create(payload);
    return result;
};

const getAllSportTypes = async () => {
    const result = await SportType.find({ });
    return result;

}

export const sportTypeServices = {
    createSportType,
    getAllSportTypes
};
