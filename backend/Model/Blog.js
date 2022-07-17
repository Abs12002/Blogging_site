import mongoose from "mongoose";
import User from './User';
import Comments from './Comments';

const { Schema } = mongoose;

const blogSchema= new Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    require:true
},
image:{
    type:String,
    required:true
},
user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
comments:[{type: mongoose.Schema.Types.ObjectId, ref:Comments,required:true}],
created_at : { 
    type: Date, required: true, default: Date.now 
}


});
export default mongoose.model('Blog',blogSchema);