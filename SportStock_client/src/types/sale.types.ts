export type TSale = {
    _id: string;
    saleId: string;
    saleDate?: string;
    totalPrice: number;
    branch: string;
    quantity: number;
    buyerName: string;
    productName: string;
    isDeleted?: boolean;
};
