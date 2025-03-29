import express from "express"
import {body, query} from "express-validator" 
import { captainAuth, userAuth } from "../middlewares/auth.middleware.js"
import { confirmRide, createRide, getFarePrice } from "../controllers/ride.controller.js"

const router = express.Router() 

router.post('/create',
    body('pickUp').isString().isLength({min: 3}).withMessage("Invalid pick-up location"),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid destination Location"),
    body('vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle Type"),

    body('fare').isObject().withMessage("Fare must be an object"),
    body('fare.cost').isObject().withMessage("Fare cost must be an object"),
    body('fare.cost.motorcycle').isNumeric().withMessage("Motorcycle fare must be a numeric value"),
    body('fare.cost.auto').isNumeric().withMessage("Auto fare must be a numeric value"),
    body('fare.cost.car').isNumeric().withMessage("Car fare must be a numeric value"),
    body('fare.otherInfo').isObject().withMessage("Fare otherInfo must be an object"),
    body('fare.otherInfo.distanceInKm').isNumeric().withMessage("Distance in km must be a numeric value"),
    body('fare.otherInfo.timeInMin').isNumeric().withMessage("Time in minutes must be a numeric value"),
    
    userAuth, 
    createRide,
)
router.get('/get-fare',
    query('pickUp').isString().isLength({min: 3}).withMessage("Invalid pick-up location"),
    query('destination').isString().isLength({min: 3}).withMessage("Invalid destination Location"),
    userAuth, 
    getFarePrice,
)

router.post('/confirm',
    body('rideId').isMongoId().withMessage("Invalid ride ID"),
    captainAuth,
    confirmRide
)

export default router