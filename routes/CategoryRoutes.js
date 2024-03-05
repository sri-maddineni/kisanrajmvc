import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CategoryController, categoryController, deleteSingleCategory, singleCategoryController, updateCategoryController } from "../controllers/CategoryController.js";

const router = express.Router();


//routes

router.post("/create-category", requireSignIn, isAdmin, CategoryController)

//update category

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)
export default router


//get all categories
router.get("/categories", categoryController)


//get single category
router.get("/single-category/:slug", singleCategoryController)


//delete single category
router.delete("/delete-category/:id",requireSignIn,isAdmin, deleteSingleCategory)