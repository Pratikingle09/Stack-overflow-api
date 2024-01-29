const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/auth')

const signup = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            res.json({message:"User already Exist."})
        }

        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await User.create({name,email,password:hashedPassword})
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.json({result:newUser,token})

        
    } catch (error) {
        console.log(error)
    }

}

const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const existingUser = await User.findOne({email})
        if(!existingUser)
        {
            res.json({message:"User doesn't Exist."})
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect)
        {
            res.json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.json({result:existingUser,token})
    } catch (error) {
       console.log(error)
    }
}

module.exports={signup,login}