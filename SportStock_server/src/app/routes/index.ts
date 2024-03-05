import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);

export default router;
