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

router.get(
    "/adjusted",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    StockHistoryController.getALlAdjustedStockHistory
);

router.get(
    "/transferred",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    StockHistoryController.getALlTransferredStockHistory
);

router.get(
    "/line-chart",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    StockHistoryController.getLineChartData
);

export const StockHistoryRoutes = router; 