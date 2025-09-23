import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:string, 
        required:true, 
    },
    email:{
        type:String, 
        reqiured:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },

},{timestamps:true});

export default User = mongoose.model("User", userSchema)