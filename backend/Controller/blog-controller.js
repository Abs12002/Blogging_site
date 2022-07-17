import res from "express/lib/response";
import Blog from "../Model/Blog";
import User from "../Model/User";


export const getAllBlog =  async (req,res,next) => {
    let blogs;
    try{
       blogs=await Blog.find().populate("user_id");
    }
    catch(err){
        return res.status(404).json({message: "some error "});
    } 
    if(!blogs){
               return res.status(404).json({message: "blogs not found "});
    }

    return res.status(200).json({blogs});
}
export const addBlog = async (req, res, next) =>{
    const {title, description,image,user_id} = req.body;
    

    

    let existingUser;
    try{
        existingUser = await User.findById(user_id);

    }
    catch(err){
        return res.status(404).json({message:"something went wrong1111 "});
    }

    if(!existingUser){
        return res.status(404).json({message:"could't find this User"})
        }

    const blog = new Blog({

    title, 
    description,
    image,
    user_id
    });
   
    try{
    //    const session = await  mongoose.startSession();
    //    session.startTransaction();
           await blog.save();
           existingUser.blogs.push(blog);       
         await existingUser.save();
      //await session.commitTransaction();
    }


    
    catch(err){
        return res.status(404).json({message:"something went wrong 123"});
    }

    return res.status(200).json({blog}); 

}
export const update = async (req, res, next) => {
    const{title ,description,image}=req.body;
    const blogId=req.params.id;

    let blog;
    try {
       blog= await Blog.findByIdAndUpdate(blogId,{
            title,
            description,
            image

        })
    }
    catch (err) {
        return res.status(404).json({message:"something went wrong 1234"});
    }
    
    if (!blog) {
        return res.status(404).json({message:"couldn't save"});
    }

    return res.status(200).json({blog});

}

export const getById = async (req, res, next) => {
const blogId = req.params.id;
let blogs;
try{
blogs=await Blog.findById(blogId).populate( "comments").populate( "user_id");
}
catch(err){
    return res.status(404).json({message:"something went wrong"});
}
if(!blogs) {
     return res.status(404).json({message:"couldn't find this id"});
}
return res.status(200).json({blogs});

}


export const deleteById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
    blog=await Blog.findByIdAndRemove(blogId).populate("user_id");
    await blog.user_id.blogs.pull(blog);
    await blog.user_id.save();
    }
    catch(err){
        return res.status(404).json({message:"something went wrong123"});
    }
    if(!blog) {
         return res.status(404).json({message:"couldn't find this id"});
    }
    return res.status(200).json({blog});
    
    }
    export const getUserById = async (req,res,next) => {

        const userId=req.params.id;
        let userBlogs;
        try{
             userBlogs=await User.findById(userId).populate("blogs");
           
        }
        catch(err){
            return res.status(404).json({message:"something went wrong11"});
        }

        if(!userBlogs){
            return res.status(404).json({message:"something went wrong123"});
        }
        ;
        return res.status(200).json({blogs:userBlogs.blogs});
    }