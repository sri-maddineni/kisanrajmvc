import express from "express";
import {
    getUserData
} from "../controllers/authController.js";




const router = express.Router();

////register user method post

router.get("/:uid", getUserData);




export default router;
