import { validationResult } from "express-validator";
import { createRideService } from "../services/ride.service.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ success: false, mesaage: errors.array() });
  }
  const {pickUp , destination , vehicleType} = req.body;
  
  try {
    const ride = await createRideService({user:req.user._id, pickUp, destination, vehicleType})
    return res.status(200).json(ride)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "server error"})
  }
}
