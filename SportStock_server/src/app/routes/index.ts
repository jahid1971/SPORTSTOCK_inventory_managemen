import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { sportTypeRoutes } from "../modules/sportType/sportType.route";
import { BrandRoutes } from "../modules/brand/brand.route";
import { BranchRoutes } from "../modules/branch/branch.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/sport-types", sportTypeRoutes);
router.use("/brands", BrandRoutes);
router.use("/branches", BranchRoutes);

export default router;
