import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(upload.fields([
    {
        name : "profile",
        max : 1
    }
]),
registerUser)







export default router;