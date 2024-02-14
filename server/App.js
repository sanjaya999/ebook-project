import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : "20kb"}))

app.use(express.urlencoded({extended: true , limit:"16kb" }))
app.use(express.static("public"))

app.use(cookieParser())



//routers


import router from "./routes/user.routes.js"

//routes declatration , write other routes also

app.use("/api/v1/users",router);


export {app}