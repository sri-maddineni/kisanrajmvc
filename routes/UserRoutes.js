import express from "express";
import {
    getUserData,updateUserData
} from "../controllers/authController.js";




const router = express.Router();

////register user method post

router.get("/:uid", getUserData);

//change or edit profile

router.post("/updateuserdata/:uid",updateUserData)




export default router;
