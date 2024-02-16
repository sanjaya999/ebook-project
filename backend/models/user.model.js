import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({

    username : {
        type : String,
        requried : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },

    email : {
        type : String,
        requried : true,
        unique : true,
        lowercase : true,
        trim : true,
        
    }


})

export const User = mongoose.model("User" , userSchema)