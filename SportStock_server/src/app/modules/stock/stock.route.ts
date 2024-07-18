import { Router } from "express";
import { StockController } from "./stock.controller";

const router = Router();

router.post("/", StockController.addStock);

router.post("/adjust", StockController.adjustStock);

router.post("/transfer", StockController.transferStock);

router.get("/", StockController.getAllStocks);

export const StockRoutes = router;
