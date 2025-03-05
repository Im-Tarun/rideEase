import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";

export const userRegister = async (req, res) => {
    const {fullName, emailId, password} = req.body
    const validError = validationResult(req);
    
    if(!emailId || !password || !fullName.firstName){
      return res.status(400).json({mesaage: "please enter all the details "})  
    }
    if (!validError.isEmpty()) {
      res.status(400).json({ success: false, mesaage: validError.array() });
    }
   try {
        const hashedPassword = await userModel.hashPassword(password);
        const newUser = new userModel({
            fullName:{
                firstName : fullName.firstName,
                lastName : fullName.lastName,
            },
            emailId,
            password: hashedPassword,
        })
        await newUser.save()
      const token = newUser.generateAuthToken();
      return res.status(200).json({mesaage: newUser,token})  
    } catch (error) {
        console.log(error)
        return res.status(500).json({mesaage: "sever error"})  
   }
 
};
