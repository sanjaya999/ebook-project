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

    

        const user =   await User.create({
            fullName ,
            
            email,
            password,
            newUser : true,
            

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
                user : loggedInUser , accessToken , refreshToken ,
                isNewUser: user.newUser,

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
        const books = await Book.find({}).sort({ approved:1 , accessCount : -1});
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

    const changePasswrord = asyncHandler(async(req , res)=>{
        const {oldPassword , newPassword } = req.body;

        const user = await User.findById(req.user?._id)
       

        const isPasswordValid = await user.isPasswordCorrect(oldPassword);
        if(!isPasswordValid){
            throw new ApiError(400 , "old password incorrect")
        }

        user.password = newPassword 
        await user.save({validateBeforeSave : false})
        return res.status(200)
        .json(new ApiResponse(200 , "Password changed successfully"))
    })


    const notLoggedin = asyncHandler(async (req, res) => {
        try {
            const books = await Book.find({}, { bookName: 1, bookImage: 1, description: 1, uploadedBy: 1 , genre :1, accessCount:1 , approved: 1});
      
          return res.status(200).json(new ApiResponse(200, books, "Book list fetched"));
        } catch (err) {
          throw new ApiError(500, "Error fetching book list");
        }
      });

      const bookApproved = asyncHandler(async (req, res) => {
        const { bookId } = req.query;
        const { isApproved } = req.body;
    
        try {
            const book = await Book.findById(bookId);
    
            if (!book) {
                return new ApiError(404, "no book found")
            }
    
            book.approved = isApproved;
            await book.save();
    
            return res.status(200)
                .json(new ApiResponse(200, "book Approved"))
        }
        catch (error) {
            return res.status(500)
                .json(new ApiError(500, "error at bookApprove"))
        }
    })

    const bookmark = asyncHandler(async(req , res)=>{
        try {
            const userId = req.user.id;
            console.log(userId);
            const  bookId  = req.params.bookId;
        
            const user = await User.findByIdAndUpdate(userId, 
              { $addToSet: { bookmarks: bookId } }, 
              { new: true } 
            );
        
           return res.status(200)
           .json(new ApiResponse(200 , { bookmarks: user.bookmarks })); 
          } catch (err) {
            return res.status(500)
            .json(new ApiError(500 , { error: 'Error adding bookmark' }));
          }
    })

    const getbookmark = asyncHandler(async(req, res) => {
        try {
            const {userId} = req.body;
            console.log("this is user id from get" , userId);
            const user = await User.findById(userId)
                                    .populate({
                                        path: 'bookmarks',
                                        model: 'Book' // This should match the model name you used in mongoose.model call
                                    });
    
            if (!user) {
                return res.status(404).json(new ApiError(404, { error: 'User not found' }));
            }
    
            return res.status(200).json(new ApiResponse(200, { bookmarks: user.bookmarks }));
        } catch (err) {
            res.status(500).json(new ApiError(500, { error: 'Error fetching bookmarks' }));
        }
    });

    const deleteBookmark = asyncHandler(async (req, res) => {
        try {
          const userId = req.user.id;
          console.log(userId);
          const  bookId  = req.params.bookId;
          console.log(bookId);

      
          const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { bookmarks: bookId } },
            { new: true }
          );
      
          return res.status(200).json(
            new ApiResponse(200, {
              bookmarks: user.bookmarks,
            })
          );
        } catch (err) {
          return res.status(500).json(
            new ApiError(500, {
              error: 'Error deleting bookmark',
            })
          );
        }
      });


      const updateGenre = asyncHandler(async (req, res) => {
        try {
            const {userId} = req.body;
            const newGenres = req.body.genres;
            console.log(newGenres);
    
            if (!userId) {
                return res.status(400).json(new ApiResponse(400, "Please provide a userId"));
            }
    
            if (!newGenres) {
                return res.status(400).json(new ApiResponse(400, "Please provide genres to update"));
            }
    
            // Find and Update User (set isNewUser to false)
            const user = await User.findByIdAndUpdate(userId, {
                genres: newGenres,
                newUser: false 
            }, { new: true }); 
    
            if (!user) {
                return res.status(404).json(new ApiResponse(404, "User not found"));
            }
    
            // Send Success Response
            res.json(new ApiResponse(200, "Genres and status updated successfully"));
    
        } catch (error) {
            console.error("Error updating genre:", error);
            res.status(500).json(new ApiError(500, "Error updating genres and status"));
        }
    });

    const fetchGenre = asyncHandler(async (req, res) => {
        
        const {userId} = req.body;
                  const user = await User.findById(userId);
          console.log(" this is fetchgenre userid " + userId);
      
          if (!user) {
            throw new ApiError(404, "User not found");
          }
      
          const userGenres = user.genres;
      
          let books;
      
          if (userGenres.length > 0) {
            books = await Book.find({ genre: { $in: userGenres } });
          } else {
            books = await Book.find({});
          }
      
          for (const book of books) {
            book.accessCount += 1;
            await book.save();
          }
      
          return res.status(201).json(new ApiResponse(200, books, "book fetched"));
       
      });
    

    
      

 
export {registerUser , loginUser,logoutUser , userDetail,
     handleFile , fetchBook , search , topPicks, adminFetchBooks ,
     adminFetchUsers , deleteBook,bookmark ,deleteBookmark,getbookmark,deleteUser ,userApprove ,changePasswrord,notLoggedin, bookApproved
    ,updateGenre, fetchGenre} 