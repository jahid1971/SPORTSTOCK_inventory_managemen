import { Router } from "express";

import { authControllers } from "./auth.controller.js";
import checkAuth from "../../middleWares/checkAuth.js";
import { userRole } from "../../constants/user.js";

const router = Router();

router.get("/me", authControllers.getMe);

router.post("/login", authControllers.logIn);

router.post("/refresh", authControllers.refresh);

router.post(
    "/change-password",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    authControllers.changePassword
);

router.post("/logout", authControllers.logOut);

export const authRoutes = router;
