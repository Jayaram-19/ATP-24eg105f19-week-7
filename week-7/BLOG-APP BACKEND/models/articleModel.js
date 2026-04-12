import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"user ID is required"],

    },
    comment:{
        type:String
    },

});

const articleSchema = new Schema({
    author:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"Author ID is required"],
    },
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    category:{
        type:String,
        required:[true,"category is required"],
    },
    content:{
        type:String,
        required:[true,"content is required"],
    },
    comments:{
        type:String
        
    },
    isArticaleActive:{
        trpe:Boolean
    },
   comments:[{type:commentSchema,deafult:[]}],
isArticleActive:{
type:Boolean,
deafult:true
}
},
{
    versionKey:false,
        timestamps:true,
          strict:"throw"
},
);

//create articale model
export const articleModel=model("article",articleSchema)

//{comment:"",user:""}