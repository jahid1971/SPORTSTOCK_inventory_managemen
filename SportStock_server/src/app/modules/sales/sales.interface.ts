export interface ISale {
    saleId?: string;
    productName: string;
    productId: string;
    buyerName: string;
    soldBy: {
        sellerName: string;
        id: string;
    };
    saleDate: Date;
    quantity: number;
    price: number;
    totalPrice: number;
    branch: {
        _id: string;
        branchName: string;
    };
    isDeleted?: boolean;
}
