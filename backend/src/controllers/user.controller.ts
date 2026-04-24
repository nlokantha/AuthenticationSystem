import type { Request, Response } from 'express';
import User from '../models/user.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const registerUser = async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        const checkExistingEmail = await User.findOne({email});
        if(checkExistingEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }
      

        // hash user password before saving to database
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            passwordHash
        })
        await newUser.save();

        return res.status(201).json({
            success:true,
            message:"User registered successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const loginUser = async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        console.log(email,password)
        const user = await User.findOne({email}).select("+passwordHash");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const accessToken = jwt.sign({
            userId:user._id,
            email:user.email
        },process.env.JWT_SECRET as string,{
            expiresIn:"15m"
         })

         return res.status(200).json({
            success:true,
            message:"Login successful",
            accessToken
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}