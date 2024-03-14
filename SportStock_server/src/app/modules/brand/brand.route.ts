import { Router } from "express";
import { BrandController } from "./brand.controller";

const router = Router();

router.post("/add-brand", BrandController.createBrand);
router.get("/", BrandController.getAllBrands);

export const BrandRoutes = router;
