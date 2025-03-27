import { validationResult } from "express-validator";
import { createRideService, getFare } from "../services/ride.service.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const {pickUp , destination , vehicleType, fare} = req.body;

    const ride = await createRideService({user:req.user._id, pickUp, destination, vehicleType, fare})
    return res.status(200).json(ride)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "server error"})
  }
}

export const getFarePrice = async(req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const {pickUp , destination } = req.query;
  const fare = await getFare(pickUp, destination) 
  try {
    
    return res.status(200).json(fare)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Server error"}) 
  }
}
