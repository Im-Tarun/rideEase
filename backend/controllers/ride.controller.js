import { validationResult } from "express-validator";
import {addCapInRide, createRideService, getFare,getRideOtp,} from "../services/ride.service.js";
import {coordinatesFunc,getCaptainsInRadius,} from "../services/maps.service.js";
import {sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";    

export const createRide = async (req, res) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const { pickUp, destination, vehicleType, fare } = req.body;

    const ride = await createRideService({
      user: req.user._id,
      pickUp,
      destination,
      vehicleType,
      fare,
    });

    const { lat, lng } = await coordinatesFunc(pickUp);
    console.log(lat, lng);
    const captainsInRadius = await getCaptainsInRadius(lat, lng, 15); //last is radius
    const rideAndUser = await rideModel.findById(ride._id).populate("user");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, "new-ride", rideAndUser);
    });

    return res
      .status(200)
      .json({
        message: "Sent notification to all nearby captains",
        otp: ride.otp,
        captains: captainsInRadius.length,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const getFarePrice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { pickUp, destination } = req.query;
  const fare = await getFare(pickUp, destination);
  try {
    return res.status(200).json(fare);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const acceptRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const newRide = await addCapInRide(rideId, req.captain._id);
    sendMessageToSocketId(
      newRide.user.socketId,
      "ride-accepted",
      newRide.captain
    ); 
    res.status(200).json({ message: "message sent to user", newRide });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { otp, rideId } = req.body;
  try {
    const ride = await getRideOtp(otp, rideId);

    if (otp !== ride.otp) {
      return res
        .status(400)
        .json({ success: false, message: "OTP provided doesn't match" });
    }
    sendMessageToSocketId(ride.user.socketId, "ride-started", ride);
    return res.status(200).json({ message: "Ride has started successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { rideId } = req.body;
  if (!rideId) {
    throw new Error("Ride ID not Found");
  }
  try {
    const ride = await rideModel
      .findOneAndUpdate(
        {
          _id: rideId,
          captain: req.captain._id,
        },
        {
          status: "completed",
        }
      ).populate("user");

    if (!ride) {
      return res
        .status(400)
        .json({ success: false, message: "Ride not found" });
    }
    sendMessageToSocketId(ride.user.socketId, "ride-completed", ride);
    return res.status(200).json({ message: "Ride has competed successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
