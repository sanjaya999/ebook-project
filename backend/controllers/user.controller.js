import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { upload } from "../middlewares/multer.middleware.js";
import mongoose from "mongoose";


const registerUser = asyncHandler(async(req,res) => {
    

    const {fullName , email  , password}= req.body
       console.log("email:" , email);

        //validate if empty field 
      if(
        [fullName,email,password].some((field)=>field?.trim()==="")
        ){
            throw ApiError(400 , "All fields are required")
        }

         const existedUser =  await User.findOne({
             email 
        })

        if (existedUser){
            throw new ApiError(409 , "User already existed")

        }

       //req.body gives access by express and req.files is by multer middleware
    //    const profileLocalPath = req.file?.profile[0]?.path;
        
    //      if(!profileLocalPath){
    //         throw new ApiError(400 , "profile file is required");

    //      }

    //       const profile = await uploadOnCloudinary(profileLocalPath)

    //     if(!profile){
    //         throw new ApiError(400 , "profile is requried")
    //      }

        const user =   await User.create({
            fullName ,
            
            email,
            password,
            // profile : profile.url,
            

        })
        //check if use exist in database or not 
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500 , "sth went wrong while regisering the user")
        }


        return res.status(201).json(
            new ApiResponse(200, createdUser , "User registered Successfully")
        )


    })

 

export {registerUser} 