import mongoose from "mongoose";
import Blog from "./Blog";
const { Schema } = mongoose;

 const userSchema= new Schema({
     name:{
         type:String,
         required:true

     },
     email:{
         type:String,
         required:true,
         unique:true      
     }
     ,
     
     password:{
         type:String ,
         minlength:6,
         required:true,
         
     },
     blogs:[{type: mongoose.Schema.Types.ObjectId, ref:Blog,required:true}]
     
 });

 export default mongoose.model("User",userSchema);