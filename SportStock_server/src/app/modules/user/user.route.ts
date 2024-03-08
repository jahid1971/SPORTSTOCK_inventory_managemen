import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.patch("/update-status/:id", userController.updateUserStatus);

export const userRoutes = router;
