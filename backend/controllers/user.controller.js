import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import blTokenModel from "../models/blackListToken.model.js";

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;
  const errors = validationResult(req);

  if (!email || !password || !fullName.firstName) {
    return res.status(400).json({ message: "please enter all the details " });
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  const isUserAlreadyExist = await userModel.findOne({ email: email.trim().toLowerCase() });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "Email already registered" });
  }

  try {
    const hashedPassword = await userModel.hashPassword(password);
    const newUser = new userModel({
      fullName: {
        firstName: fullName.firstName.trim().toLowerCase(),
        lastName: fullName.lastName.trim().toLowerCase(),
      },
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();

    const token = newUser.generateAuthToken();
    return res.status(200).json({ message: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "sever error" });
  }
};

export const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { password, email } = req.body;

  try {
    const user = await userModel
      .findOne({ email: email.trim().toLowerCase() })
      .select("+password"); // select + password because did select false in model in password
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Email is not registered.",
        });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "password does not match" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({ success: true, message: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "sever error" });
  }
};

export const userProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export const logOut = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");
    if (!token) {
      return res.status(400).json({ message: "Token is required for logout" });
    }
    const blToken = new blTokenModel({ token });
    await blToken.save();
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }

  console.log("done");
  return res.status(200).json({ message: "logged out successfully" });
};
