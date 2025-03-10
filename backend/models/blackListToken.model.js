import mongoose from "mongoose";

const blTokenSchema = new mongoose.Schema({
    token:{
        required : true,
        unique : true,
        type : String
    },
    createdAt:{
        type : Date,
        default: Date.now,
        expires: 86400, //expires in 24 hours whole doc
    }

})

const blTokenModel = mongoose.model("bltoken", blTokenSchema)

export default blTokenModel;