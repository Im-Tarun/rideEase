import express from "express"
import {body} from "express-validator" 
import { userAuth } from "../middlewares/auth.middleware.js"
import { createRide } from "../controllers/ride.controller.js"

const router = express.Router()

router.post('/create',
    body('pickUp').isString().isLength({min: 3}).withMessage("Invalid pick-up location"),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid destination Location"),
    body('vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle Type"),
    userAuth, 
    createRide,
)

export default router