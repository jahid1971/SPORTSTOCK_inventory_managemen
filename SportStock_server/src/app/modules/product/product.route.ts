import { Router } from "express";
import { productControllers } from "./product.controller";

const router = Router();

router.post("/create-product", productControllers.createProduct);

export const productRoutes = router;
