

import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDNARY_API_KEY, 
  api_secret: process.env.CLOUDNARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath)return null;
        //upload
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"})
        console.log("file uploaded on cloudinary" , response.url)
        fs.unlinkSync(localFilePath)
        
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null;

    }
}

export {uploadOnCloudinary}