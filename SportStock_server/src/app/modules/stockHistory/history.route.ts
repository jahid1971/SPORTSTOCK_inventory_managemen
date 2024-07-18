import { Router } from "express";
import { userRole } from "../../constants/user";
import checkAuth from "../../middleWares/checkAuth";
import { StockHistoryController } from "./history.controller";

const router = Router();

router.get(
    "/",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    StockHistoryController.getAllStockHistory
);

export const StockHistoryRoutes = router; 