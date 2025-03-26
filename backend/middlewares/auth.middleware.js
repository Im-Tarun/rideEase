import blTokenModel from "../models/blackListToken.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";

export const userAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklisted = await blTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized logged out" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //we take token and secret than verify and return obj that condtain _id of mdb
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "unauthorized" });
  }
};

export const captainAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "captain not found" });
    }
    req.captain = captain;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
