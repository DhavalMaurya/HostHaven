const mongoose = require("mongoose")
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect("mongodb+srv://dhavalmaurya229:dhavalmaurya229@cluster0.fz98t.mongodb.net/hostheven").then(()=>{
        console.log("Database connected....");
    }).catch((error)=>{
        console.log("Something went wrong while connecting to database :",error)
        process.exit(1);
    })
}
