import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async(req,res) => {
    res.json({
        message : "this is register user in controller"
    })
})



export {registerUser}