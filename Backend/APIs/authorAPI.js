import exp from "express";
import { userModel } from "../models/userModel.js";
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
export const authorApp = exp.Router();

// Write article (protected route)
authorApp.post("/article", verifyToken("AUTHOR"), upload.single("imageUrl"), async (req, res, next) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    
    // get article fields from client
    const { title, category, content } = req.body;
    
    if (!title || !category || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const articleData = {
      title,
      category,
      content,
      author: req.user.id,
    };
    
    console.log("Author ID:", articleData.author);
    
    // verify author exists in DB
    const author = await userModel.findById(articleData.author);
    if (!author) {
      return res.status(404).json({ message: "Invalid author" });
    }

    // Log request file presence
    console.log('Received file:', req.file ? 'yes' : 'no');
    
    // upload image to Cloudinary if provided
    if (req.file) {
      try {
        const cloudResult = await uploadToCloudinary(req.file.buffer);
        articleData.imageUrl = cloudResult.secure_url;
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        return res.status(500).json({ message: 'Image upload failed', error: uploadErr.message });
      }
    }

    // create article Document
    const articleDoc = new ArticleModel(articleData);
    // save
    await articleDoc.save();
    // send res
    res.status(201).json({ message: "Article published successfully" });
  } catch (err) {
    console.error("Error in article creation:", err);
    next(err);
  }
});

// Read own articles
authorApp.get("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    // get author id from decoded token
    const authorIdOfToken = req.user?.id;
    // get articles by author id (include both active and deleted)
    const articlesList = await ArticleModel.find({ author: authorIdOfToken }).sort({ createdAt: -1 });
    // send res
    res.status(200).json({ message: "articles", payload: articlesList });
  } catch (err) {
    next(err);
  }
});

// Edit article
authorApp.put("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    // get author id from decoded token
    const authorIdOfToken = req.user?.id;
    // get modified article from client
    const { articleId, title, category, content } = req.body;
    const modifiedArticle = await ArticleModel.findOneAndUpdate(
      { _id: articleId, author: authorIdOfToken },
      { $set: { title, category, content } },
      { new: true },
    );

    // if either article id or author not correct
    if (!modifiedArticle) {
      return res.status(403).json({ message: "Not authorized to edit article" });
    }
    // send res
    res.status(200).json({ message: "Article modified", payload: modifiedArticle });
  } catch (err) {
    next(err);
  }
});

// Delete article (soft delete / restore)
authorApp.patch("/articles", verifyToken("AUTHOR"), async (req, res, next) => {
  try {
    // get author id from decoded token
    const authorIdOfToken = req.user?.id;
    // get modified article from client
    const { articleId, isArticleActive } = req.body;
    // get article by id
    const articleOfDB = await ArticleModel.findOne({ _id: articleId, author: authorIdOfToken });

    if (!articleOfDB) {
      return res.status(404).json({ message: "Article not found or not authorized" });
    }

    // check status
    if (isArticleActive === articleOfDB.isArticleActive) {
      return res.status(200).json({ message: "Article already in the same state", payload: articleOfDB });
    }

    articleOfDB.isArticleActive = isArticleActive;
    await articleOfDB.save();
    // send res
    res.status(200).json({ message: "Article modified", payload: articleOfDB });
  } catch (err) {
    next(err);
  }
});
