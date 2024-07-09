import { Router } from "express";
import { productControllers } from "./product.controller";
import { upload } from "../../utls/sendImageToCloudinary";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";

const router = Router();

router.post(
    "/create-product",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    // upload?.single("file"),
    (req, res, next) => {
        req.body = JSON.parse(req.body.productData);
        next();
    },
    productControllers.createProduct
);
router.get(
    "/",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER, userRole.SELLER),
    productControllers.getAllProducts
);
router.get(
    "/meta",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    productControllers.getDashboardMeta
);
router.get("/:id", productControllers.getSingleProduct);
router.put(
    "/delete-product/:id",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    productControllers.deleteProduct
);
router.patch(
    "/:id",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    productControllers.updateProduct
);
router.patch(
    "/multi-delete/batch",
    checkAuth(userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    productControllers.multiProductDelete
);


export const productRoutes = router;
