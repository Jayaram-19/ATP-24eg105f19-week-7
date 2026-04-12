import { Schema,model } from "mongoose";


const UserTypeSchema = new Schema({
  firstName:{
    type:String,
    required:[true,"First name is required"]
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    required:[true,"Email required"],
    unique:[true,"Email is already exists"]
  },
  password:{
    type:String,
    required:[true,"Password required"]
  },
  role:{
    type:String,
    enum:["USER","AUTHOR","ADMIN"],
    required:[true,"Invalid role"]
  },
  profileImageUrl:{
    type:String
  },
  isUserActive:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true,
  versionKey:false,
  strict:"throw"
})


export const userModel = model("user",UserTypeSchema);