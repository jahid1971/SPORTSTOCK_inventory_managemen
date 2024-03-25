import { Router } from "express";
import { productControllers } from "./product.controller";
import { upload } from "../../utls/sendImageToCloudinary";

const router = Router();

router.post(
    "/create-product",
    upload.single("file"),
    (req, res, next) => {
        req.body = JSON.parse(req.body.productData);
        next();
    },
    productControllers.createProduct
);
router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getSingleProduct);
router.put("/delete-product/:id", productControllers.deleteProduct);
router.patch("/:id", productControllers.updateProduct);

export const productRoutes = router;
