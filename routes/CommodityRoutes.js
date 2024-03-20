import express from "express";
import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js"
import {
    createProductController,
    productFilterController,
    updateProductController,
    productPhotoController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    getAllProductController,
    proposedListController,
    declineoffer,
    proposalsRecievedList,
    getProductsController
}
    from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

router.post('/create-product', requireSignIn, formidable(), createProductController)

//get all posted products only for listings
router.get("/get-posted-products", requireSignIn, getProductController)

//get all products
router.get("/get-all-product", getAllProductController)

//for loggedin user get products to buy
router.get("/get-all-products", requireSignIn, getProductsController)

//get single product
router.get("/get-product/:id", requireSignIn, isUser, getSingleProductController)

//get photo route
router.get("/product-photo/:pid", productPhotoController)

//delete product route
router.get("/delete-product/:pid", deleteProductController)

//update product
router.put("/update-product/:pid", requireSignIn, isUser, formidable(), updateProductController)

//filter routes
router.post("/product-filter", productFilterController)



//decline offer
router.post("/decline", requireSignIn, isUser, declineoffer)


//proposed list  proposals sent list
router.post("/proposedlist", requireSignIn, isUser, proposedListController)


// proposals recieved list
router.post("/proposals-recieved", requireSignIn, isUser, proposalsRecievedList)


export default router;