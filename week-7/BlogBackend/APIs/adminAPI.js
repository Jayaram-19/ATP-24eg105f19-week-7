import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { userModel } from '../models/userModel.js'
export const adminApp = exp.Router()
//admin login
//read all users and authors
adminApp.get('/users',verifyToken("ADMIN"),async (req,res)=>{
   const users =await userModel.find({role:["USER",'AUTHOR']})
   res.status(200).json({message:"all users",payload:users})
})
//block or activate users and authors
adminApp.patch('/users', verifyToken('ADMIN'), async (req, res) => {

  // get email from request body
  const { email } = req.body;

  // find user by email
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // toggle user active status
  user.isUserActive = !user.isUserActive;

  // save updated user
  await user.save();

  // response message based on status
  res.status(200).json({
    message: user.isUserActive ? "User activated" : "User blocked",
    payload: user
  });

});

