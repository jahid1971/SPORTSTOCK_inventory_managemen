import catchAsynch from "../../utls/catchAsynch";
import sendSuccessResponse from "../../utls/sendSuccessResponse";
import { sellerServices } from "./seller.service";

const updateSellereStatus = catchAsynch(async (req, res) => {
    const result = await sellerServices.updateSellerStatus(req.params.sellerId, req.body);
    sendSuccessResponse(res, result, "Seller status updated successfully", 200);
});
