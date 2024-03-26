import { Router } from "express";
import { productControllers } from "./product.controller";

const router = Router();

router.post("/addProduct", productControllers.addProduct);

export const productRoutes = router;
