import mongoose from 'mongoose';
import Blog from "./Blog";
import User from "./User";
const {Schema} =mongoose;

const commentSchema=new Schema({

    comment:{
 type:String,
 required:true
             },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    required:true
        } ,

        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
            }        

})
export default mongoose.model("Comment",commentSchema);