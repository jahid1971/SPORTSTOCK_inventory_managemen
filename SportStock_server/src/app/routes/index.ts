import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { sportTypeRoutes } from "../modules/sportType/sportType.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/users", userRoutes);
router.use("/sport-types", sportTypeRoutes);

export default router;
