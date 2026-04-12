import exp from 'express'
import { userModel } from '../models/userModel.js'
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'

export const commonApp = exp.Router()

//Rauter for register
commonApp.post('/user',async(req,res)=>{
    let allowedRoles=["USER","AUTHOR"]
    //get user from req
    const newUser=req.body
    //chheck roles
    if(!allowedRoles.includes(newUser.role)){
       return  res.status(401).json({message:"Invalied Status"})
    }
    //hash password and replace plain with hashed one 
    newUser.password = await hash(newUser.password,12)
    //create new user document
    const newUserDoc=new userModel(newUser)
    //save document
    await newUserDoc.save()
    //send res 
    res.status(201).json({message:"User Created"})
})
//Raute for login and logout 

//[1,2,3].include(2)

//Raute for user login(user , auther and admin)
commonApp.post('/login', async(req,res)=>{
    //roles accepted to login
    //get user cred obj
    const {email,password}=req.body;
    //find user by email
    const user=await userModel.findOne({email:email});
    //if user not found
    if(!user){
        return res.status(400).json({message:"invalid email"})

    }//compare pasword
    const isMatched=await compare(password,user.password)
    if(!isMatched){
        return res.status(400).json({message:"invalid password"})
    }
  const signedToken = jwt.sign(
  {id:user._id,email:email, role:user.role },
  process.env.SECRET_KEY,
  { expiresIn: "1d" }
);
    //SET TOKEN TO COOKIE HEADER
    //http only cooke by using 3rd param coc http onlt then clinet side cant access it
    res.cookie("token",signedToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    //send res
    //remove password from user document by changing mongodb doc to js obj cz delet op can be performed on js only
   let userObj = user.toObject()
   delete userObj.password;

    res.status(200).json({message:"login success",payload:userObj})
   })

   //user logout
   commonApp.post('/logout', async(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });
     res.status(200).json({ message: "Logout successful" });
   });


   ///Change password
    commonApp.put("/pasword",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
        //check current password and new password are same
        //get current password of user /admin/author 
        //check the current password of req and user are not same
        //hash new password 
        //Replace current password of user with hashed new password 
        //save
        //send res

    })