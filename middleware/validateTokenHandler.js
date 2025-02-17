const jwt = require("jsonwebtoken");


const validateToken = async(req,res,next)=> {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_SECRET,(err,decoded)=>{
                if(err){
                  return  res.status(401).json("User is not authorized");
                }
                //console.log(decoded);
                
                req.user = decoded.user;  //when req is going to this middleware and then  this middleware  decode the  token and going to add req.user property 
                next();
            });
            if(!token){
             return   res.status(401)
                .json("User is not authorized");
            }
        }

    }catch(err) {
        res.status(400).json({message:err.message});
    }
}

module.exports = validateToken;