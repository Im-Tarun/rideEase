import express from "express"
import {body, query} from "express-validator" 
import { userAuth } from "../middlewares/auth.middleware.js"
import { createRide, getFarePrice } from "../controllers/ride.controller.js"

const router = express.Router()

router.post('/create',
    body('pickUp').isString().isLength({min: 3}).withMessage("Invalid pick-up location"),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid destination Location"),
    body('vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle Type"),
    userAuth, 
    createRide,
)
router.get('/get-fare',
    query('pickUp').isString().isLength({min: 3}).withMessage("Invalid pick-up location"),
    query('destination').isString().isLength({min: 3}).withMessage("Invalid destination Location"),
    userAuth, 
    getFarePrice,
)

export default router