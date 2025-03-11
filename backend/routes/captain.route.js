import express from "express"
import {body} from "express-validator"
import { captainRegister, captainLogin, captainProfile, logOut } from "../controllers/captain.controller.js";
import { captainAuth } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName").isLength({min:3}).withMessage("first name must be atleast 3 character long"),
    body("password").isLength({min:6}).withMessage("password must be atleast s6ix character long"),
    body("vehicle.color").isLength({min:3}).withMessage("color must be atleast 3 character long"),
    body("vehicle.plate").isLength({min:6}).withMessage("plate number must be atleast 4 character long"),
    body("vehicle.capacity").isInt({min:1}).withMessage("capacity must be atleast 1 or how you carry your passenger"),
    body("vehicle.vehicleType").isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle type "),
], captainRegister);

router.post('/login',[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("password must be atleast six character long")
], captainLogin)

router.get("/profile", captainAuth , captainProfile )

router.get("/logout", captainAuth , logOut )

export default router;