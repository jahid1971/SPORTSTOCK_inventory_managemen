import { Router } from "express";
import { productControllers } from "./product.controller";
import checkAuth from "../../middleWares/checkAuth";
import { userRole } from "../../constants/user";
import { handleImageUpload } from "../../middleWares/handleImageUpload";

const router = Router();

router.post(
    "/create-product",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),

    handleImageUpload,

    productControllers.createProduct
);
router.get(
    "/",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    productControllers.getAllProducts
);

router.get(
    "/stock-availability",
    checkAuth(
        userRole.ADMIN,
        userRole.SUPER_ADMIN,
        userRole.BRANCH_MANAGER,
        userRole.SELLER
    ),
    productControllers.stockAvailability
);
router.get("/:id", productControllers.getSingleProduct);
router.put(
    "/delete-product/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    productControllers.deleteProduct
);
router.patch(
    "/:id",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    handleImageUpload,
    productControllers.updateProduct
);
router.patch(
    "/multi-delete/batch",
    checkAuth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.BRANCH_MANAGER),
    productControllers.multiProductDelete
);

export const productRoutes = router;
