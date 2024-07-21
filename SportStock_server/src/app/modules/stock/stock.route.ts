import { Router } from "express";
import { StockController } from "./stock.controller";

const router = Router();

router.post("/", StockController.addStock);

router.post("/adjust", StockController.adjustStock);

router.post("/transfer", StockController.transferStock);

router.get("/", StockController.getAllStocks);

router.get("/bar-chart", StockController.stocksBarChart);

router.get("/pie-chart", StockController.stocksPieChart);

router.get("/dashboard-cards", StockController.getDashboardCards);

export const StockRoutes = router;
