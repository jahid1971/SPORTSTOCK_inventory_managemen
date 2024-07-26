import { Router } from "express";
import { BranchController } from "./branch.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import validateRequest from "../../middleWares/validateRequest";
import { BranchValidation } from "./branch.validation";

const router = Router();

router.post(
    "/create-branch",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN),
    validateRequest(BranchValidation.CrteateBranchSchema),
    BranchController.createBranch
);
router.get(
    "/",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    BranchController.getAllBranches
);

router.patch(
    "/update-branch-status/:branchId",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN),
    BranchController.updateBranchStatus
);

router.delete(
    "/delete-branch/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN),
    BranchController.deleteBranch
);

export const BranchRoutes = router;
