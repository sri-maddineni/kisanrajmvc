import express from "express";
import { postRequirementController,getRequirementController, postPotentialController } from "../controllers/RequirementController.js";

import { isAdmin, isUser, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

//register user method post
router.post("/post-requirement", postRequirementController);

//get requirement based on pid, sellerid, buyerid
router.post("/get-requirement", getRequirementController);


//POST requirement for potential lead method post
router.post("/post-potential",requireSignIn,isUser, postPotentialController);






export default router;
