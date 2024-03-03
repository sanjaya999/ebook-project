import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser,loginUser,logoutUser,userDetail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.fields([
    {
        name : "profile",
        maxCount : 1
    }
]),
registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post( verifyJWT , logoutUser)
router.route("/userId").get(verifyJWT , userDetail)







export default router;