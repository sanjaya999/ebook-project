import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser,loginUser,logoutUser,userDetail ,
    handleFile, fetchBook, search, topPicks , 
    adminFetchBooks,getbookmark,deleteBookmark, bookmark,adminFetchUsers, deleteUser , deleteBook,notLoggedin,bookApproved,
    userApprove , changePasswrord , updateGenre,fetchGenre} from "../controllers/user.controller.js";
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
router.route("/upload").post(verifyJWT, upload.fields([
    {
        name:"bookImage",
        maxCount : 1
    },
    {
        name : "bookFile",
        maxCount : 1
    }
])
,handleFile)

router.route("/explore").get(verifyJWT , fetchBook)
router.route("/search").get(search)
router.route("/topPicks").get( verifyJWT ,topPicks)

router.route("/adminBooks").get( verifyJWT , adminFetchBooks)
router.route("/adminUsers").get(verifyJWT , adminFetchUsers)
router.route("/adminDeleteUser").delete(verifyJWT,deleteUser)
router.route("/adminDeleteBook").delete(verifyJWT,deleteBook)
router.route("/approveUser").put(verifyJWT , userApprove)
router.route("/changePassword").post(verifyJWT , changePasswrord)
router.route("/notLoggedin").get(notLoggedin)
router.route("/adminApproveBook").put(verifyJWT , bookApproved)



router.route("/bookmarks/:bookId")
.post(verifyJWT , bookmark)
.delete(verifyJWT, deleteBookmark)
router.route("/getbookmarks").post(verifyJWT ,getbookmark)


router.route("/updateGenre").put(verifyJWT , updateGenre)
router.route("/fetchGenre").post(fetchGenre)














export default router;