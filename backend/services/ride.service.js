import rideModel from "../models/ride.model.js";
import { distanceTimeFunc } from "./maps.service.js";
import crypto from "crypto";

//function to get fare price
const getFare = async (pickUp, destination) => {
  if (!pickUp || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceTime = await distanceTimeFunc(pickUp, destination);
  const { distance, duration } = distanceTime;

  // Define rates per kilometer, per minute, and base fare for different vehicle types
  const rates = {
    motorcycle: { baseFare: 10, perKm: 5, perMin: 1 },
    auto: { baseFare: 15, perKm: 8, perMin: 1.5 },
    car: { baseFare: 20, perKm: 10, perMin: 2 },
  };

  // Convert distance from meters to kilometers and time from seconds to minutes
  const distanceInKm = distance.value / 1000;
  const timeInMin = duration.value / 60;

  // Calculate fares for each vehicle type
  const fares = {
    cost: {
      motorcycle: (
        rates.motorcycle.baseFare +
          distanceInKm * rates.motorcycle.perKm +
          timeInMin * rates.motorcycle.perMin
      ).toFixed(3),
      auto: (
        rates.auto.baseFare +
          distanceInKm * rates.auto.perKm +
          timeInMin * rates.auto.perMin
      ).toFixed(3),
      car: (
        rates.car.baseFare +
          distanceInKm * rates.car.perKm +
          timeInMin * rates.car.perMin
      ).toFixed(3),
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
}) => {
  if (!user || !pickUp || !destination || !vehicleType) {
    throw new Error("All fields are requiered");
  }
  const fare = await getFare(pickUp, destination);

  const newRide = new rideModel({
    user,
    pickUp,
    destination,
    duration: fare.otherInfo.distanceInKm.toFixed(3),
    distance : fare.otherInfo.timeInMin.toFixed(3),
    fare: fare.cost[vehicleType],
    otp: generateOtp(6)

  });
  await newRide.save();
  return newRide;
};

