import { Schema,Types,model } from "mongoose";


//Create user schema(firstname,lastName,password,email,)
const userSchema=new Schema({
    //Structe of user resource
    firstName:{
        type:String,
        required:[true,"username is required"],
        minLength:[4,"min length of username is 4 chars"],
        maxLength:[30,"max length of username is 30 chars"]
    },
    lastName:{
        type:String,
        required:[true,"username is required"],
        minLength:[4,"min length of username is 4 chars"],
        maxLength:[30,"max length of username is 30 chars"]
    },
    password:{
        type:String,
        required:[true,"Password Required"]
    },
    email:{
        type:String,
        required:[true,"Email Required"],
        unique:true
    },
    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,"Role is required"]

    },
    profileImageURL:{
        type:String
    },
    isUserActive:{
        type:Boolean,
        default:true
    }
    
},
{
        versionKey:false,
        timestamps:true,
        strict:"throw"
    },
);

//generate userModel
export const userModel=model("user",userSchema)

