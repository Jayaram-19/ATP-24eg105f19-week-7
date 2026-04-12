import exp from 'express'
import {userModel} from '../models/userModel.js'
import { articleModel } from '../models/articleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { get } from 'mongoose'
import { upload } from '../middlewares/cloudinaryConfig.js'
export const authorApp = exp.Router()

///write article
authorApp.post("/article", verifyToken("AUTHOR"), upload.single("articleImage"), async(req,res)=>{
  //get articleObj from client
  let articleObj;
  try {
    articleObj = req.body;
  } catch(e) {
    articleObj = req.body; // already parsed by multer
  }

  if (req.file) {
    articleObj.articleImageUrl = req.file.path;
  }
  
  let user=req.user
  //check author
  let author = await userModel.findById(articleObj.author);
  if(author.email!==user.email){
    return res.status(403).json({message:"you are not auhtorized"});
  }
  if(!author){
    return res.status(404).json({message:"no author found"})
  }
  //check role
  if(author.role!=="AUTHOR"){
    return res.status(403).json({message:"Only author can publish"})
  }
  //create article document
  const articleDoc = new articleModel(articleObj)
  //save
  await articleDoc.save()
  //send res
  res.status(200).json({message:"article created.",payload:articleDoc})
})
//read article
authorApp.get("/articles",verifyToken("AUTHOR"),async (req,res)=>{
  //get articles by author email
  const authorIdOfToken=req.user?.id;
  //check author
  let articlesList = await articleModel.find({author:authorIdOfToken});
  //send res
  res.status(200).json({message:"articles",payload:articlesList});
})

//edit article
authorApp.put('/article',verifyToken("AUTHOR"),async (req,res)=>{
 //get articles by author email
  const authorIdOfToken=req.user?.id;
  //get modified article from client 
  const {articleId,title,category,content}= req.body;
  const modifiedArticle = await articleModel.findOneAndUpdate({_id:articleId,author:authorIdOfToken},{$set:{title,category,content}},{new:true})
  if(!modifiedArticle){
    return res.status(403).json({message:"Article not found"})
  }
  res.status(200).json({message:"Updated successfully.",payload:modifiedArticle})
})


//delete article
authorApp.patch("/article",verifyToken("AUTHOR"),async (req,res)=>{
  //get articles by author email
  const authorIdOfToken=req.user?.id;
  //get modified article from client 
  const {articleId,isArticleActive}= req.body;
  //get article by id
  const articleOfDB= await articleModel.findOne({_id:articleId,author:authorIdOfToken})
  //check status
  if(isArticleActive===articleOfDB.isArticleActive){
    return res.status(200).json({message:"Article already in the same state"})
  }

  articleOfDB.isArticleActive=isArticleActive
  await articleOfDB.save();
  //send res
  res.status(200).json({message:"article modified",payload:articleOfDB})
})
