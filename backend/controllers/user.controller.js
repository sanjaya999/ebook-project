import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import multer from 'multer';
import mongoose, { trusted } from "mongoose";



const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return {accessToken , refreshToken}
    }
    catch(error){
        throw new ApiError(500, "sth went wrong while generating refreshtoken")

    }


}




const registerUser = asyncHandler(async(req,res) => {
    

    const {fullName , email  , password}= req.body
       console.log("email:" , email);

        //validate if empty field 
      if(
        [fullName,email,password].some((field)=>field?.trim()==="")
        ){
            throw ApiError(400 , "All fields are required")
        }

         const existedUser =  await User.findOne({ email })

        if (existedUser){
            throw new ApiError(409 , "User already existed")

        }

      // req.body gives access by express and req.files is by multer middleware
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




    const loginUser = asyncHandler(async(req,res)=>{

        const {email,password} = req.body
        console.log(email , password)
        if (!email && !password ){
            throw new ApiError(400 , "email and password required")
        }

        const user = await User.findOne({email})
        if (!user){
            throw new ApiError(404 , "user doesnt exist")
        }


        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            throw new ApiError(401, "Invalid user credentials")
        }


        const {accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id)

        const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")
        //cookies by default can be edited but with httponly it can only be modified by server
        const option = {
            httpOnly : true,
            secure : true,
        }

         return res.status(200)
         .cookie("accessToken",accessToken,option)
         .cookie("refreshToken" , refreshToken,option)
         .json(
            new ApiResponse(200,{
                user : loggedInUser , accessToken , refreshToken

            },
            "user logged in successful")
         )
    })

    const logoutUser = asyncHandler(async(req,res)=>{
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $unset :{
                    refreshToken : 1
                }
            },
            {
                new: true
            }
        )
        const option = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .clearCookie("accessToken",option)
        .clearCookie("refreshToken",option)
        .json(new ApiResponse(200, {}, "User logged out"))
    })
    

    const userDetail = asyncHandler(async(req , res)=>{
        const { _id } = req.body;
        console.log(_id);
        const detailAboutUser = await User.findById(_id)
        .select("-password -refreshToken");
        

        if(!detailAboutUser){
              throw new ApiError(500 , "user not found")
        }
        else{
            return res.status(200).json(
                new ApiResponse (200, {user : detailAboutUser}))
        }        
        


    })
 

export {registerUser , loginUser,logoutUser , userDetail} 