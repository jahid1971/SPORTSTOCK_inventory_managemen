import { Router } from "express";
import { BranchController } from "./branch.controller";

const router = Router();

router.post("/create-branch", BranchController.createBranch);
router.get("/", BranchController.getAllBranches);

export const BranchRoutes = router;
