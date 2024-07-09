import { Router } from "express";
import { SportTypeController } from "./sportType.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";

const router = Router();

router.post(
    "/create-sport-type",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    SportTypeController.createSportType
);
router.get("/", SportTypeController.getAllSportTypes);

export const sportTypeRoutes = router;
