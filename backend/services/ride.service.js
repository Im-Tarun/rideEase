import rideModel from "../models/ride.model.js";
import { distanceTimeFunc } from "./maps.service.js";
import crypto from "crypto";

//function to get fare price
export const getFare = async (pickUp, destination) => { 
  if (!pickUp || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceTime = await distanceTimeFunc(pickUp, destination); 
  const { distance, duration } = distanceTime;

  // Define rates per kilometer, per minute, and base fare for different vehicle types
  const rates = {
    motorcycle: { baseFare: 10, perKm: 4, perMin: 0.5 },
    auto: { baseFare: 15, perKm: 7, perMin: 1 },
    car: { baseFare: 20, perKm: 9, perMin: 1.5 },
  };

  // Convert distance from meters to kilometers and time from seconds to minutes 
  const distanceInKm = distance/ 1000;
  const timeInMin = duration / 60;

  // Calculate fares for each vehicle type
  const fares = {
    cost: {
      motorcycle: (
        rates.motorcycle.baseFare +
          distanceInKm * rates.motorcycle.perKm +
          timeInMin * rates.motorcycle.perMin
      ).toFixed(2),
      auto: (
        rates.auto.baseFare +
          distanceInKm * rates.auto.perKm +
          timeInMin * rates.auto.perMin
      ).toFixed(2),
      car: (
        rates.car.baseFare +
          distanceInKm * rates.car.perKm +
          timeInMin * rates.car.perMin
      ).toFixed(2),
    },
    otherInfo:{
        distanceInKm,
        timeInMin
    }
  };

  return fares;
};

const generateOtp = (num) => {
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, "0");
    return otp; // Return an array of strings, each representing a digit
};

export const createRideService = async ({
  user,
  pickUp,
  destination,
  vehicleType,
  fare,
}) => {
  if (!user || !pickUp || !destination || !vehicleType || !fare) {
    throw new Error("All fields are requiered");
  }
  // const fare = await getFare(pickUp, destination); //we already got fare in frontend by an api so better not calc again

  const newRide = new rideModel({
    user,
    pickUp,
    destination,
    duration: fare.otherInfo.distanceInKm.toFixed(3),
    distance : fare.otherInfo.timeInMin.toFixed(3),
    fare: fare.cost[vehicleType],
    otp: generateOtp(6),
    status: "pending"
  });
  await newRide.save(); 
  return newRide;
};

export const addCapInRide = async(rideId, capId) => {
  if (!rideId || !capId) {
    throw new Error("Ride ID and Captain ID are required");
  } 
  const ride = await rideModel.findByIdAndUpdate(rideId, {
    captain : capId,
    status: "accepted"
  }, { new: true }).populate("captain").populate("user")
  
  if (!ride) {
    throw new Error("Ride not found");
  } 
  return ride;
}

export const getRideOtp = async(otp, rideId)=>{
  if (!otp || !rideId) {
    throw new Error("Ride ID and Otp are required");
  } 
  const ride = await rideModel.findByIdAndUpdate(rideId, { 
    status: "ongoing"
  }, { new: true }).populate("captain").populate("user").select("+otp") 

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
}