import express from "express"
import {body} from "express-validator"
import { userRegister, userLogin, userProfile, logOut } from "../controllers/user.controller.js"
import { userAuth } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("first name must be atleast three character long"),
    body("password").isLength({min:6}).withMessage("password must be atleast six character long")
], userRegister);

router.post('/login',[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("password must be atleast six character long")
], userLogin)

router.get("/profile", userAuth , userProfile)

router.get("/logout", userAuth , logOut)

export default router