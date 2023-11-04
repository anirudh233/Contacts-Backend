const asyncHandler=require('express-async-handler')
const user=require("../models/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const registerUser=asyncHandler(async(req,res)=>
{
    
    const {username,email,password}=req.body
    if(!username || !email || !password)
    {
        res.status(400)
        throw new Error("All field are mandatory")
    }
    const userAvailable=await user.findOne({email})
    console.log(userAvailable)
    if(userAvailable)
    {
        res.status(400)
        throw new Error("User already registered!")
    }
const hashedPassword=await bcrypt.hash(password,10)
const user1=await user.create({
    username,
    email,
    password: hashedPassword
})
if(user1)
{
    res.status(201).json({_id: user1.id,username: user1.username,email: user1.email})
}
else{
    res.status(400)
    throw new Error("User data is not valid")
}
    res.json({message:"Register the user"})
})
const loginUser=asyncHandler(async(req,res)=>
{
    const {email,password}=req.body
    if(!email || !password)
    {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const user2=await user.findOne({email})
    if(user2 && (await bcrypt.compare(password,user2.password)))
    {
        const accessToken=jwt.sign(
            {
                user3:
                {
                    username: user2.username,
                    email:user2.email,
                    id:user2.id
                }
            },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
})
const currentUser=asyncHandler(async(req,res)=>
{
    res.json(req.user)
})
module.exports={registerUser,loginUser,currentUser}