import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import blTokenModel from "../models/blackListToken.model.js";

export const userRegister = async (req, res) => {
    const {fullName, email, password} = req.body
    const errors = validationResult(req);
    
    if(!email || !password || !fullName.firstName){
      return res.status(400).json({mesaage: "please enter all the details "})  
    }
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, mesaage: errors.array() });
    }
   try {
        const hashedPassword = await userModel.hashPassword(password);
        const newUser = new userModel({
            fullName:{
                firstName : fullName.firstName,
                lastName : fullName.lastName,
            },
            email,
            password: hashedPassword,
        })
        await newUser.save()
      const token = newUser.generateAuthToken();
      return res.status(200).json({mesaage: newUser, token})  
    } catch (error) {
        console.log(error)
        return res.status(500).json({mesaage: "sever error"})  
   }
 
};

export const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({ success: false, mesaage: errors.array() });
  }
  const {password, email} = req.body;

  try {
    const user = await userModel.findOne({email}).select('+password') // select + password because did select false in model in password
    if(!user){
      return res.status(401).json({ success: false, mesaage: "Email is not registered. Register first" });
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return res.status(401).json({ success: false, mesaage: "password does not match" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    
    return res.status(200).json({ success: true, mesaage: user, token });
  } catch (error) {
      console.log(error)
      return res.status(500).json({mesaage: "sever error"}) 
  }

}

export const userData = async (req, res) => {
  res.status(200).json(req.user)
}

export const logOut = async (req, res) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.authorization?.split(" ")[1]
  const blToken = new blTokenModel({token})
  await blToken.save();

  res.status(200).json({mesaage : "logged out successfully"})
}


