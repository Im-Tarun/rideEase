import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const captainSchema = new mongoose.Schema({
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
 
    status:{
        type: String,
        enum : ["active", "inactive"],
        default : "inactive"
    },

    vehicle:{
        color:{
            type: String,
            required: true,
            minlength  : 3
        },
        plate:{
            type: String,
            required: true,
            minlength : 6,
        },
        vehicleType:{
            type: String,
            required: true,
            enum:['car','motorcycle','auto'],
        },
        capacity:{
            type: Number,
            required: true,
            min: 1,
        },
        location:{
            lat:{
                type:Number
            },
            lng:{
                type:Number
            }
        }

    }

})

captainSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
  return token;
}

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model("captain", captainSchema )

export default captainModel;