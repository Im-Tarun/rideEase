import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import blTokenModel from "../models/blackListToken.model.js";

export const captainRegister = async (req, res) => {
    const {fullName, email, password, status, vehicle} = req.body
    if(!email || !password || !fullName.firstName || !vehicle.color || !vehicle.vehicleType || !vehicle.plate || !vehicle.capacity ){
        return res.status(400).json({mesaage: "please enter all the details "})  
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, mesaage: errors.array() });
    }

    const isCaptainAlreadyExist = await captainModel.findOne({email})
    if(isCaptainAlreadyExist){
      return res.status(400).json({message: "Email already registered"})  
    }

    try {
        const hashedPassword = await captainModel.hashPassword(password);
        const newCaptain = new captainModel({
            fullName:{
                firstName : fullName.firstName,
                lastName : fullName.lastName,
            },
            email,
            password: hashedPassword,
            status,
            vehicle:{
                color : vehicle.color,
                plate : vehicle.plate,
                vehicleType : vehicle.vehicleType,
                capacity : vehicle.capacity,
            }

        })
        await newCaptain.save();

        const token = newCaptain.generateAuthToken();
        return res.status(200).json({message: newCaptain, token})  
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({mesaage: "sever error"}) 
    }

}

export const captainLogin = async (req, res) => {
    const {password, email} = req.body;
    const errors = validationResult(req);
  
    if(!errors.isEmpty()){
      return res.status(400).json({ success: false, mesaage: errors.array() });
    }
  
    try {
      const captain = await captainModel.findOne({email}).select('+password')
      if(!captain){
        return res.status(401).json({ success: false, mesaage: "Email is not registered. Register first" });
      }
      const isMatch = await captain.comparePassword(password);
  
      if(!isMatch){
        return res.status(401).json({ success: false, mesaage: "password does not match" });
      }
      const token = captain.generateAuthToken();
      res.cookie("token", token);
      
      return res.status(200).json({ success: true, mesaage: captain, token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({mesaage: "sever error"}) 
    }
  
}

export const captainProfile = async (req, res) => {
  return res.status(200).json(req.captain)
}

export const logOut = async (req, res) => {
  try {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
  res.clearCookie('token');
  if (!token) {
    return res.status(400).json({ message: "Token is required for logout" });
  }
  const blToken = new blTokenModel({token})
  await blToken.save();
    
  }catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }

  res.status(200).json({mesaage : "logged out successfully"})
}
