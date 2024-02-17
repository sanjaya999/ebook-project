import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : "20kb"}))
                            //can have object inside obj
app.use(express.urlencoded({extended: true , limit:"16kb" }))


app.use(express.static("public"))

app.use(cookieParser())


//routes

import router from "./routes/user.routes.js"

app.use("/api/v1/user",router)


export {app}