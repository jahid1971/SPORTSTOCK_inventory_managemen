import { Router } from "express";
import { SportTypeController } from "./sportType.controller";

const router = Router();

router.post("/create-sport-type", SportTypeController.createSportType);
router.get("/", SportTypeController.getAllSportTypes);

export const sportTypeRoutes = router;
