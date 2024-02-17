import mongoose, { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"

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
        
    },

    fullName : {
        type : String,
        requried : true,
        trim : true,
        index : true
    },

    image : {
        type : String,
    },

    password : {
        type : String,
        required : [true , "Password is required"]
    },

    refreshToken : {
        type : String,
    }



})

//encrypt password with bcrypt
userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,5)
    }
    else{
        next();
    }
})

//compare encrypted password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}


userSchema.method.generateAccessToken = function(){
    return Jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}


userSchema.methods.generateRefreshToken = function(){
    return Jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User = mongoose.model("User" , userSchema)