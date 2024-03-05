import express from "express";
import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js"
import { createProductController,productFilterController,updateProductController,productPhotoController,deleteProductController, getProductController,getSingleProductController } from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//get all products
router.get("/get-products", requireSignIn, getProductController)

//get single product
router.get("/get-product/:id", getSingleProductController)

//get photo route
router.get("/product-photo/:pid",productPhotoController)

//delete product route
router.get("/delete-product/:pid",deleteProductController)

//update product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController)

//filter routes
router.post("/product-filter",productFilterController)

export default router;