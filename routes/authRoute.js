import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController

} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

////register user method post

router.post("/register", registerController);

//login post
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);


//test routes

router.get("/test", requireSignIn, isAdmin, testController);


///protected routes


//user route check
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//admin route checking
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;
