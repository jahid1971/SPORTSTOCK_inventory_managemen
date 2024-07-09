import { Router } from "express";
import { BranchController } from "./branch.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";

const router = Router();

router.post("/create-branch", checkAuth(userRole.SUPER_ADMIN), BranchController.createBranch);
router.get(
    "/",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    BranchController.getAllBranches
);

export const BranchRoutes = router;
