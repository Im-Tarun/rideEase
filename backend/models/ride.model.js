import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({ 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickUp: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    enum: ["car", "auto", "motorcyle"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
  },
  distance: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  fare:{
    type: Number,
    required: true,
  },
  otp:{
    type: String,
    select : false,
    required: true
  },
  
});

const rideModel = mongoose.model('ride', rideSchema)

export default rideModel;
