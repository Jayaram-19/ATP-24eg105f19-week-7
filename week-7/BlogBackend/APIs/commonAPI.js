import express from "express";
import { hash,compare } from "bcryptjs";
import {userModel} from "../models/userModel.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../middlewares/cloudinaryConfig.js";
config();
const {sign} = jwt;
export const commonApp = express.Router();

// Register user
commonApp.post("/users", upload.single('profileImage'), async (req, res) => {
  let allowedRoles=['USER','AUTHOR'];
    // When using multer, form fields are in req.body except the file
    // Wait, the original code used newUser = req.body but we are sending JSON if no file, wait... no, if using FormData, let's parse from req.body
    let newUser;
    try {
      // If we are passing stringified object in a field or directly text fields from form-data
      // Let's assume standard form-data fields for email, firstName, lastName, password, role
      newUser = req.body;
    } catch(e) {
      newUser = req.body;
    }

    if(req.file) {
      newUser.profileImageUrl = req.file.path;
    }

    if(!allowedRoles.includes(newUser.role)){
      return res.status(400).json({message:"Invalid role"})
    }
    // hash password
    newUser.password = await hash(newUser.password, 10);

    // create document
    const newUserDoc = new userModel(newUser);

    await newUserDoc.save();

    res.status(201).json({ message: "User created." });
});

//login

commonApp.post("/login",async(req,res)=>{
  //get user credentials
  const {email,password} = req.body;
  //find user by email
  const user = await userModel.findOne({email:email})
  //if email not found
  if(!email){
    res.status(400).json({message:"Invalid email"})
  }
  //compares passwords
  const isMatched = await compare(password,user.password);
  //if not matched
  if(!isMatched){
    res.status(400).json({message:"Invalid password"})
  }
  //create jwt
  const signedToken = sign({id:user._id,email:email,role:user.role},process.env.SECRET_KEY,{expiresIn:"7d"}) ;
  //set token to res header as httpOnly cookie
  res.cookie("token",signedToken,{
    httpOnly:true,
    secure:true,
    sameSite:"none"
  })
  //remove password
  const userObj = user.toObject();
  delete userObj.password;
  //send res 
  res.status(200).json({message:"login success",payload:userObj});
})

//route for logout
commonApp.get('/logout', (req,res)=>{
  //delete token from cookie storage
  res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:"none"
  });
  //send res
  res.status(200).json({message:"Logged out successfully...."})
})

//change password
commonApp.put('/password', verifyToken("USER","LOGIN","ADMIN"), async (req,res)=>{

  const { currentPassword, newPassword } = req.body;

  //check if passwords same
  if(currentPassword === newPassword){
    return res.status(400).json({message:"Both passwords are same"});
  }

  //get user id
  const userId = req.user?.id;

  //get user document
  const user = await userModel.findById(userId);

  if(!user){
    return res.status(404).json({message:"User not found"});
  }

  //compare passwords
  const compared = await compare(currentPassword, user.password);

  if(!compared){
    return res.status(400).json({message:"Current password incorrect"});
  }

  //hash new password
  const hashedPassword = await hash(newPassword,10);

  //update password
  user.password = hashedPassword;

  await user.save();

  res.status(200).json({
    message:"Password changed successfully"
  });

});