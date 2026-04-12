import exp from 'express'
import {userModel} from '../models/userModel.js'
import {articleModel} from '../models/articleModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'

export const authorApp=exp.Router()


//write article(protected route)
authorApp.post("/article",verifyToken("AUTHOR"),async(req,res)=>{
 //get articleObj from client
const articleObj=req.body;
const user=req.user;     
 //check author
const author =await userModel.findById(articleObj.author);
if(author.email!==user.email){
return res.status(403).json({message:"You are not authorized"})
}
if(!author){
return res.status(404).json({message:"Invalid author"});
}
//create article Document
const articleDoc=new articleModel(articleObj)
//save
await articleDoc.save()
res.status(200).json({message:"Article published successfully",payload:articleDoc})
})


//read own article
authorApp.get("/articles",verifyToken("AUTHOR"),async(req,res)=>{
//read article by author email
const authorIdOfToken=req.user?.id;
const articleList=await articleModel.find({author:authorIdOfToken})
res.status(200).json({message:"The are articles are",payload:articleList})
})

//edit article
authorApp.put("/articles",verifyToken("AUTHOR"),async(req,res)=>{
//get author email from decoded token
const userEmailOfToken=req.user?.email
const author = await userModel.findOne({email: userEmailOfToken});
const authorIdOfToken = author._id;
//get modified article from client
const {articleId,title,category,content}=req.body;
const modifiedArticle=await articleModel.findOneAndUpdate({_id:articleId,author:authorIdOfToken},
{$set:{title,category,content}},{returnDocument:"after"})
if(!modifiedArticle){
return res.status(404).json({message:"not auhtorized to edit the article"});
}
res.status(200).json({message:"article updated successfully",payload:modifiedArticle})
})


//delete article(soft delete)
authorApp.patch("/article",verifyToken("AUTHOR"),async(req,res)=>{
//get author email from decoded token
const userEmailOfToken=req.user?.email
const author = await userModel.findOne({email: userEmailOfToken});
const authorIdOfToken = author._id;
//get modified article from client
const {articleId,isArticleActive}=req.body;
//get article by id
const articleOfDB=await articleModel.findOne({_id:articleId,author:authorIdOfToken})
if(!articleOfDB){
return res.status(404).json({message:"not authorized to modify the article"});
}
//check status
if(isArticleActive===articleOfDB.isArticleActive){
return res.status(200).json({message:"Article already in the same state"})
}
articleOfDB.isArticleActive=isArticleActive
await articleOfDB.save()
//send res
res.status(200).json({message:"Article modified",payload:articleOfDB})
});