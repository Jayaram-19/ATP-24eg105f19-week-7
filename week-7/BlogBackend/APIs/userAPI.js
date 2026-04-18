import exp from 'express'
import {articleModel} from '../models/articleModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const userApp = exp.Router()

//read all articles of all authors
userApp.get('/articles',verifyToken("USER","AUTHOR","ADMIN"),async (req,res)=>{
  //read all articles
  const articlesList = await articleModel.find({isArticleActive:true})
  //send res
  res.status(200).json({message:"articles",payload:articlesList})
})

//add comment by user to an article
userApp.put('/article',verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
  //get body from req
  const  {articleId,comment}=req.body
  //check article
  const articleDoc = await articleModel.findOne({_id:articleId,isArticleActive:true})
  //if article not found
  if(!articleDoc){
    return res.status(404).json({message:"article not found"})
  }
  //get user id
  const userId = req.user?.id;
  //add comment to comments array of articleDoc
  articleDoc.comments.push({user:userId,comment:comment})
  //save
  await articleDoc.save();
  //send res
  res.status(200).json({message:"comment added successfully.. ",payload:articleDoc})

})