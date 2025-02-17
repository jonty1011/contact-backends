const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async(req,res)=> {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
           return res.status(400).json({message:"Invalid credentials"});
        }
        const userExist = await userModel.findOne({email});
        if(userExist){
           return res.status(400).json({message:"User already exists"});
        }
            // hashing the password
            const hashedPassword = await bcrypt.hash(password,10);
            console.log(hashedPassword);
            
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,});
            
            console.log(`User created ${user}`);
             if(user){
               return res.status(200).json({_id:user.id,email:user.email});
             }else{
               return res.status(400).json({message:"Failed to create user"});
             }
           
        // res.status(200).json({message:"User is Registered"});
    }catch(e){
       return res.status(400).json({message:e.message});
    } 
}

const login = async(req,res)=> {
    try {
        const {email ,password} = req.body;
        if(!email || !password){
            return res.json({message:"Invalid credentials"});
        }
        const user = await userModel.findOne({email});
        if(user &&( await bcrypt.compare(password, user.password))){
            const accessToken = await jwt.sign({
               user:{
                username: user.username,  // this what we created is payload --> (data you want to include in the token)
                email: user.email,
                id: user.id,
               },
        },process.env.ACCESS_SECRET,
    {expiresIn:"15m" })
          return  res.status(200).json({accessToken});
    }else{
      return  res.status(401).json({message:"Email or password is not valid"});
    }
}catch(e){
        res.status(400).json({message:e.message});
    } 
}

const current = async(req,res)=> {
    try {
        res.send(req.user);
    }catch(e){
        res.status(400).json({message:e.message});
    } 
}

module.exports = {register, login, current};