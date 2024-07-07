import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/authRoutes.js"
import userRoute from "./routes/userRoutes.js"
import organizationRoute from "./routes/organizationRoutes.js"
import bodyParser from "body-parser"




dotenv.config()
const app = express()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT ||  5000
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res)=>{
    res.send("home")
})
app.use("/auth", authRoute)
app.use("/api", userRoute)
app.use("/api", organizationRoute)


//catch other routes
app.all("*", (req, res )=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})

//connect to DB
mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("application manager is running on PORT", PORT)
        })
    })