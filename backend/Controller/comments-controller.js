import Comments from "../Model/Comments";
import Blog from "../Model/Blog";
 export const addCmnts= async (req,res,next)=>{
    const {comment,blog_id,user_id}=req.body;

    let blog;
    try{
     blog=await Blog.findById(blog_id);
    } 
    catch(err){
            return res.status(404).json({message:"something went wrong1111 "});
        
    }; 
    if(!blog) {
        return res.status(404).json({message:"No Blog with This Id "});
    }
    const cmt = new Comments({
        comment,
        blog_id,
        user_id
    
                        });  
            
 try{
//    const session = await  mongoose.startSession();
//    session.startTransaction();
        await cmt.save();
         blog.comments.push(cmt);       
        await blog.save();
    //await session.commitTransaction();
    }
    catch(err){
    return res.status(404).json({message:"something went wrong 123"});
    }

    return res.status(200).json({cmt}); 
                               

 



}

export const getcomments= async (req,res,next)=>{

    let cmt;
    try{
       cmt= await Comments.find().populate("user_id");
    }
    catch(err){
        return res.status(404).json({message: "some error "});
    } 
    if(!cmt){
               return res.status(404).json({message: "blogs not found "});
    }

    return res.status(200).json({cmt});
   


                 }