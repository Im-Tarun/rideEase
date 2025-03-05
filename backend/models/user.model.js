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
    emailId : {
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
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET)
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model("users", userSchema )

export default userModel;