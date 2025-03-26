import { coordinatesFunc, distanceTimeFunc, suggestionFunc} from '../services/maps.service.js'
import { validationResult } from 'express-validator'

export const getCoordinates = async(req, res) => {
    try { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, mesaage: errors.array() });
        }
        const {address} = req.query;
        const coordinates = await coordinatesFunc(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: "Internal server error" })
    }

}

export const getDistanceTime = async(req, res) => {
    try { 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, mesaage: errors.array() });
        }
        const {origin, destination} = req.query;
        const distanceTime = await distanceTimeFunc(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getSuggestions = async (req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, mesaage: errors.array() });
    }
    const {input} = req.query;
    
    const suggestions = await suggestionFunc(input)
    try {

        return res.status(200).json(suggestions)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

