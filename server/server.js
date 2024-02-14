import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import {app} from "../server/App.js"

dotenv.config({
    path:"./server/.env"
})



const DB_NAME = "ebookproject"
const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`connected db host ${connectionInstance}`)
    }
    catch(error){
        console.log("connection failed server.js",error)
    }

}



connectDB().then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongodb conn failed",err);
})