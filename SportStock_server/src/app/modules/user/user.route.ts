import { Router } from "express";
import { userController } from "./user.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import { handleImageUpload } from "../../middleWares/handleImageUpload";
import validateRequest from "../../middleWares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.post(
    "/create-admin",
    checkAuth(userRole.SUPER_ADMIN),
    handleImageUpload,
    validateRequest(userValidation.adminvalidationSchema),
    userController.createAdmin
);

router.post(
    "/create-seller",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    handleImageUpload,
    validateRequest(userValidation.userValidationSchema),
    userController.createSeller
);

router.post(
    "/create-branch-manager",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN),
    handleImageUpload,
    validateRequest(userValidation.userValidationSchema),
    userController.createBranchManager
);

router.get(
    "/",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    userController.getAllUsers
);

router.get(
    "/:id",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    userController.getUserById
);

router.patch(
    "/update-status/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    userController.updateUserStatus
);

router.patch(
    "/delete-user/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    userController.deleteUser
);

router.patch(
    "/update-seller/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    handleImageUpload,
    userController.updateSeller
);

router.patch(
    "/update-admin/:id",
    checkAuth(userRole.SUPER_ADMIN),
    handleImageUpload,
    userController.updateAdmin
);

router.patch(
    "/update-branch-manager/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN),
    handleImageUpload,
    userController.updateBranchManager
);

export const userRoutes = router;
