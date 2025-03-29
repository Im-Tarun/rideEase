import { validationResult } from "express-validator";
import { addCapInRide, createRideService, getFare } from "../services/ride.service.js";
import { coordinatesFunc, getCaptainsInRadius } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js"; 
import rideModel from "../models/ride.model.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try { 
    const {pickUp , destination , vehicleType, fare} = req.body; 

    const ride = await createRideService({user:req.user._id, pickUp, destination, vehicleType, fare})
    
    const {lat, lng} = await coordinatesFunc(pickUp)
    console.log(lat, lng)
    const captainsInRadius = await getCaptainsInRadius(lat, lng, 15) //last is radius 
    const rideAndUser = await rideModel.findById(ride._id).populate('user')  
    
    captainsInRadius.map((captain)=>{
      sendMessageToSocketId(captain.socketId, "new-ride", rideAndUser ) 
    })
    
    return res.status(200).json({message: "Sent notification to all nearby captains", captains: captainsInRadius })

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

export const confirmRide = async(req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const {rideId} = req.body
  try {
    const newRide = await addCapInRide(rideId, req.captain._id)  
    sendMessageToSocketId(newRide.user.socketId, "ride-confirmed", newRide.captain)

    res.status(200).json({message: "message sent to user", newRide})
  } catch (error) {
    console.log(error) 
    return res.status(500).json({message: "server error"}) 
  }

}