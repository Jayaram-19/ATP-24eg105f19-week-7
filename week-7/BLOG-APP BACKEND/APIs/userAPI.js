import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { articleModel } from '../models/articleModel.js'

export const userApp = exp.Router()

//Read articles of all authors
userApp.get("/articles",verifyToken("USER", "AUTHOR", "ADMIN"),async(req,res)=>{
    //read articles
    const articlesList=await articleModel.find()
    //send res
    res.status(200).json({message:"articles",payload:articlesList})
})

//Read a specific article by ID
userApp.get("/article/:articleId",verifyToken("USER", "AUTHOR", "ADMIN"),async(req,res)=>{
    const articleId = req.params.articleId;
    const article = await articleModel.findById(articleId);
    if (!article) {
        return res.status(404).json({message:"Article not found"});
    }
    res.status(200).json({message:"article",payload:article});
})


//Add comment to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from req
    const {articleId, comment}=req.body;
    //check article
    const articleDocument=await articleModel.findOne({_id:articleId,isArticleActive:true}).populate("comments.user");
    //if article not found
    if(!articleDocument){
        return res.status(404).json({message:"Article not found"})
    }
    //get user id 
    const userId=req.user?.id;
    //add comment to comments array of articleDocument
    articleDocument.comments.push({user:userId,comment:comment})
    //save
    await articleDocument.save();
    //send res
    res.status(200).json({message:"comment added successfuly"})
})