import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";

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
        return res.status(200).json({mesaage: newCaptain, token})  
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({mesaage: "sever error"}) 
    }

}
