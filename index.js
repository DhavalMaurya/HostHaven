const express = require("express")
const cloudinary = require("./config/cloudinary")
const authRouter = require("./routes/Auth");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser")
const {dbConnect} = require("./config/database");
const propertyRouter = require("./routes/Property");
dbConnect();


app.use(cors());
app.use(express.json({ limit: '50mb' })); // Parse JSON requests
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Parse URL-encoded form data
app.use(cookieParser());


app.get("/welcome", (req ,res)=>{
    res.send("Welcome you are hosted ")
})


//routes middleware
app.use("/api/v1/auth"  ,authRouter);
app.use("/api/v1/property" ,propertyRouter)



app.listen(5000,()=>{
    console.log("server is running on port 5000");
})