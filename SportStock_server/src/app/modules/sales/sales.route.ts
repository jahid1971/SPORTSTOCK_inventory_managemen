import { Router } from "express";
import { salesControllers } from "./sales.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";

const router = Router();

router.post(
    "/create-sale",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    salesControllers.createSale
);
router.get("/", checkAuth(userRole.SUPER_ADMIN), salesControllers.getSales);

export const salesRoutes = router;
