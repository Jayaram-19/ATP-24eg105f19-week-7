import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
const {verify}=jwt
config();


export const verifyToken = (...allowedRoles)=>{
return async(req,res,next)=>{
  try{
  //get token from cookie
  const token = req.cookies?.token
  //check token existed or not
  if(!token){
    return res.status(401).json({message:"Please login first"})
  }
  //validate token (decode the token)
  let decodedToken = verify(token,process.env.SECRET_KEY);
  //check the role based decodeToken
  if(!allowedRoles.includes(decodedToken.role)){
    return res.status(403).json({message:"you are not authorized"});
  }
  //add decodeToken
  req.user=decodedToken;
  next();
}
  catch(err){
    res.status(401).json({message:"Invalid token"})
  }
}
}