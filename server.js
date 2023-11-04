const express=require('express');
const router = require('./routes/contactRoutes');
const router2=require('./routes/userRoutes')
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./config/dbConnection');
const dotenv=require("dotenv").config()
const app=express()
const port= process.env.PORT || 5000;
connectDb()
app.use(express.json())
app.use("/api/contacts",router)
app.use("/api/users",router2)
app.use(errorHandler)
app.listen(port,function(){
console.log("server is running on port "+port)   
})