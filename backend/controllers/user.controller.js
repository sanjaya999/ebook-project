import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import multer from 'multer';
import mongoose, { trusted } from "mongoose";
import { Book } from "../models/book.model.js";



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

    //   req.body gives access by express and req.files is by multer middleware
       const profileLocalPath = req.files?.profile[0]?.path;
        
         if(!profileLocalPath){
            throw new ApiError(400 , "profile file is required");

         }

          const profile = await uploadOnCloudinary(profileLocalPath)

        if(!profile){
            throw new ApiError(400 , "profile is requried")
         }

        const user =   await User.create({
            fullName ,
            
            email,
            password,
            profile : profile.url || "",
            

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
            // secure : true,
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
            // secure : true
        }

        return res
        .status(200)
        .clearCookie("accessToken",option)
        .clearCookie("refreshToken",option)
        .json(new ApiResponse(200, {}, "User logged out"))
    })
    

    const userDetail = asyncHandler(async(req , res)=>{
        const { _id } = req.query; 
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

    const handleFile = asyncHandler(async(req,res)=>{
        const {bookName , description , genre} = req.body

        console.log(bookName , description ,genre)

        if(!bookName && !description){
            throw new ApiError(400 , "bookname and description needed")

        }

        const bookImageLocalPath = req.files?.bookImage[0]?.path;
        if(!bookImageLocalPath){
            throw new ApiError(400 , "book image is required")
        }
         const bookFileLocalPath = req.files?.bookFile[0]?.path;
         if(!bookFileLocalPath){
            throw new ApiError(400 , "bookfile is compulsory")
         }

            const  bookImage = await uploadOnCloudinary(bookImageLocalPath)
            const bookFile = await uploadOnCloudinary(bookFileLocalPath)

            const uploadedBy = req.user._id;

         const book = await Book.create({
            bookName,
            description,
            bookImage : bookImage.url || "",
            bookFile : bookFile.url || "",
            uploadedBy: uploadedBy,
            genre : genre
         });

        return res.status(201)
        .json(new ApiResponse(200 , book , "book registered"))




    })

    const fetchBook = asyncHandler(async(req , res)=>{
        const books = await Book.find({});
        for (const book of books) {
            book.accessCount += 1;
            await book.save();
          }
        return res.status(201)
        .json(new ApiResponse (200 , books , "book fetched"))
    })

    const search = asyncHandler(async(req,res)=>{
        const searchTerm = req.query.searchTerm

        let books;

        if (searchTerm && searchTerm.trim() !== ''){
            books = await Book.find({bookName :{$regex : searchTerm , $options : "i"}});
            for (const book of books) {
                book.accessCount += 1;
                await book.save();
              }
        }
        else{
            books = [];
        }
  
    

        return res.status(201)
        .json(new ApiResponse(200 , books, "book found successfully"))
    })

    const topPicks = asyncHandler(async(req, res)=>{
        const books = await Book.find({}).sort({accessCount : -1});
        return res.status(200)
        .json(new ApiResponse(200 , books , "these are top books"));
    })

    const adminFetchBooks= asyncHandler(async(req,res)=>{
        const books = await Book.find({});
       
        return res.status(201)
        .json(new ApiResponse (200 , books , "book fetched"))

        
    })

    const adminFetchUsers = asyncHandler(async(req,res)=>{
        const allUsers = await User.find({})

        return res.status(201)
        .json(new ApiResponse (200 , allUsers , "all users fetched"))

    })

    const deleteUser = asyncHandler(async(req , res)=>{
        try{
            const user = await User.findByIdAndDelete(req.query.userId);
            if(!user){
                return res.status(404)
                .json(new ApiResponse(404 , "user not found"))
            }
            res.json(new ApiResponse(200 , " User deleted  successfully"))
        }
        catch(error){
            res.status(500)
            .json(new ApiError(500 , "server error at deleteUser"))
        }
    })

    const deleteBook = asyncHandler(async(req , res)=>{
        try{
            const book = await Book.findByIdAndDelete(req.query.bookId);
            if(!book){
                return res.status(404)
                .json(new ApiResponse(404 , "book not found"))
            }
            res.json(new ApiResponse(200 , " book deleted  successfully"))
        }
        catch(error){
            res.status(500)
            .json(new ApiError(500 , "server error at deleteBook"))
        }
    })

    const userApprove = asyncHandler(async(req , res)=>{
        const {userId} = req.query;
        const {isApproved} = req.body;

        try{
            const user = await User.findById(userId);

            if(!user){
                return new ApiError(404 , "no user found")
            }

            user.isApproved = isApproved;
            await user.save();

            return res.status(200)
            .json(new ApiResponse(200 , "user Approved"))
        }
        catch(error){
            return res.status(500)
            .json(new ApiError(500 , "error at userApprove"))
        }
    })



 

export {registerUser , loginUser,logoutUser , userDetail,
     handleFile , fetchBook , search , topPicks, adminFetchBooks ,
     adminFetchUsers , deleteBook ,deleteUser ,userApprove} 