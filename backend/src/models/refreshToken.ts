import e from "express";
import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tokenHash:{
        type:String,
        required:true,
        unique:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    userAgent:{
        type:String,
        default:""
    },
    ip:{
        type:String,
        default:""
    }
},{
    timestamps:true
})


refreshTokenSchema.index({expiresAt:1},{expireAfterSeconds:0})

refreshTokenSchema.index({tokenHash:1})

refreshTokenSchema.index({userId:1})

const RefreshToken = mongoose.model("RefreshToken",refreshTokenSchema)

export default RefreshToken;