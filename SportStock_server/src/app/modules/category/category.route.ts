import { Router } from "express";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import { CategoryController } from "./category.controller";

const router = Router();

router.post(
    "/create-category",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    CategoryController.createCategory
    
);
router.get("/", CategoryController.getAllCategory);

export const categoryRoutes = router;
