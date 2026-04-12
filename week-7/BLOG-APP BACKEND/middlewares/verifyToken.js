import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
const {verify}=jwt
config();

export const verifyToken=(...allowedRoles)=>{
return(req,res,next)=>{
try{
//get token from cookies
const token=req.cookies?.token
//check if token is available
if(!token){
return res.status(401).json({message:"please Login first"})
}
//validate token(decode the token)
let decodedToken=verify(token,process.env.SECRET_KEY)
//check the roles is same as role in decodedToken
if(!allowedRoles.includes(decodedToken.role)){
return res.status(403).json({message:"you are not authorized"})
}
//add decoded token
req.user=decodedToken;
next()
}catch(err){
res.status(401).json({message:"Invalid token"})
}
};
};