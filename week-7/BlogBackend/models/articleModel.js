import { Schema,model,Types } from "mongoose";

const commentSchema=new Schema({
  user:{
    type:Types.ObjectId,
    ref:"user",
    required:[true,"User ID required"]
  },
  comment:{
    type:String,
    required:[true,"enter a comment"]
  }
})
const articleSchema = new Schema({
  author:{
    type:Types.ObjectId,
    ref:"user",
    required:[true,"author ID is required "]
  },
  title:{
    type:String,
    required:[true,"Title is required"]
  },
  category:{
    type:String,
    required:[true,"Category is required"],

  },
  content:{
    type:String,
    required:[true,"content is required"]
  },
  articleImageUrl:{
    type:String
  },
  comments:{type:[commentSchema],default:[]},
  isArticleActive:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true,
  versionKey:false,
  strict:"throw"
});

export const articleModel = model("article",articleSchema)