import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";

import { BrandRoutes } from "../modules/brand/brand.route";
import { BranchRoutes } from "../modules/branch/branch.route";
import { salesRoutes } from "../modules/sales/sales.route";
import { categoryRoutes } from "../modules/category/category.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/brands", BrandRoutes);
router.use("/branches", BranchRoutes);
router.use("/sales", salesRoutes);

export default router;
