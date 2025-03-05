import express from "express"
import {body} from "express-validator"
import { userRegister } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/register",[
    body("emailId").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("first name must be atleast three character long"),
    body("password").isLength({min:6}).withMessage("password must be atleast six character long")
], userRegister)

export default router