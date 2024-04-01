
import { ISale } from "./sales.interface";
import Sale from "./sales.model";

const findLastSale = async () => {
    const lastSale = await Sale.findOne(
        {},
        {
            saleId: 1,
            _id: 0,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

       

    return lastSale?.saleId ? lastSale.saleId : undefined;
};

export const generateSaleId = async (payload: ISale) => {
    const saleDate = new Date(payload.saleDate);
    const year = saleDate.getFullYear().toString().slice(-2);
    const month = (saleDate.getMonth() + 1).toString().padStart(2, "0");
    const lastSaleId = await findLastSale();
    const productPrefix = payload.productName.slice(0, 3).toUpperCase();
    if (!lastSaleId) return `${productPrefix}_${month}${year}-0001`;
    const lastId = parseInt(lastSaleId.split("-")[1]);
    const currentSaleId = `${productPrefix}_${month}${year}-${(lastId + 1).toString().padStart(4, "0")}`;
    return currentSaleId;
};
