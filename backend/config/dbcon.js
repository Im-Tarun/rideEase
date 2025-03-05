import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const uri = process.env.MONGO_URI

const dbcon = async () => {
  try {
    await mongoose.connect(uri)
    console.log("Database connected successfully ")
  } catch (error) {
    console.log("db not connected",error)
    process.exit(1)
  }
}

export default dbcon
