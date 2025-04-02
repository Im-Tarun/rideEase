import express from "express"
import { captainAuth, userAuth } from "../middlewares/auth.middleware.js"
import { getCoordinates, getDistanceTime, getSuggestions } from "../controllers/maps.controller.js"
import { query } from 'express-validator'


const router = express.Router()

router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}).withMessage("min length should be 3"),
    captainAuth,
    getCoordinates
)

router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}).withMessage("min length should be 3"),    
    query('destination').isString().isLength({min: 3}).withMessage("min length should be 3"),
    userAuth, getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({min: 1}),    
    userAuth, getSuggestions
)

export default router
