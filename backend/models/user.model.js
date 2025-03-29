import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minlength : 3
        },
        lastName:{
            type: String,
            required: true,
            minlength : 3
        }
    },
    email : {
        type: String,
        required:true,
        unique: true,
        minlength : 10
    },
    password: {
        type: String,
        required : true,
        select : false
    },
    socketId:{
        type: String, 
    },
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model("user", userSchema )

export default userModel;