import { Router } from "express";
import { userController } from "./user.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import { handleFileUpload, handleImageUpload } from "../../middleWares/handleImageUpload";

const router = Router();

router.post(
    "/create-seller",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    handleImageUpload,
    (req, res, next) => {
        req.body = JSON.parse(req.body.sellerData ?? req.body);
        next();
    },
    userController.createSeller
);

router.post(
    "/create-branch-manager",
    checkAuth(userRole.SUPER_ADMIN),
    handleImageUpload,
    (req, res, next) => {
        console.log(req.body, "req.body")
        req.body = JSON.parse(req.body.branchManagerData ?? req.body);
   
        next();
    },
    userController.createBranchManager
);

router.get("/", checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER), userController.getAllUsers);
router.patch(
    "/update-status/:id",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    userController.updateUserStatus
);

router.patch(
    "/delete-user/:id",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    userController.deleteUser
);

export const userRoutes = router;
