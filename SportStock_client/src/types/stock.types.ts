export interface IStock {
    _id: string;
    branchId: string;
    productId: string;
    quantity: number;
    stockDate?: Date;
    isDeleted?: boolean;
}

export interface IStockHistory {
    stockId: string;
    branchId: string;
    transferToStock?: string;
    productId: string;
    quantityChanged: number;
    reason: string;
    madeBy: string;
    date: Date;
}
