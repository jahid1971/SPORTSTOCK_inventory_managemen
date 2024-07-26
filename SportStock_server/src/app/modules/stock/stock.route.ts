import { Router } from "express";
import { StockController } from "./stock.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";

const router = Router();

router.post(
    "/",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    StockController.addStock
);

router.post(
    "/adjust",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    StockController.adjustStock
);

router.post(
    "/transfer",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    StockController.transferStock
);

router.get(
    "/",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    StockController.getAllStocks
);

router.get(
    "/branch",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    StockController.getBranchStocks
);

router.get(
    "/bar-chart",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN),
    StockController.stocksBarChart
);

router.get(
    "/pie-chart",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    StockController.stocksPieChart
);

router.get(
    "/dashboard-cards",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    StockController.getDashboardCardsData
);

export const StockRoutes = router;
