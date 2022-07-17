import res from "express/lib/response";
import User from "../Model/User";
import bcrypt from "bcryptjs"
export const getAllUser=async(req,res,next)=>{

let users ;
try
{
    users= await User.find();
} 
catch (err){
    return console.log(err);
}
if(!users){
     return res.status(404).json({message: "User not found"});
}
return res.status(200).json({users});

};

export const signup = async(req,res,next)=>{
    const {name,email,password}= req.body;
let existinguser;
try{
    existinguser= await User.findOne({email});
}
catch(err){
    console.log(err);
}
if(existinguser){
    return res.status(400).json({message:"user alredy exist"});
}
const hashPassword=bcrypt.hashSync(password);
const user = new User({
    name,
    email,
    password:hashPassword,
    blog:[]
});
try{
    await user.save();
}
catch(err){
     return console.log(err);
}
return res.status(201).json({user});
}

export const login= async (req,res,next)=>{
const {email,password}=req.body;

let user;
try{
    
    user= await User.findOne({email:email}).populate("blogs");
}
catch(err){
    return res.status(400).json({message :"no such user exist"});
}

if(!user){
    return res.status(404).json({message :"no such user exist "});
}

const isCorrect=bcrypt.compareSync(password,user.password)
if(!isCorrect) {
    return res.status(400).json({message:"incorrect password"});
    
   
}
else
   return res.status(200).json({message:"successfully login",user});  
    


}
export const del = async (req,res,next)=>{
const userId=req.params.id;
let user;
try{
   user= await  User.findByIdAndRemove(userId).populate("blogs");
} catch(e){
    return res.status(404).json({message:"something went wrong"});
   }
   if(!user){
    return res.status(404).json({message:"could't find this user"});
   }
   return res.status(200).json({message:"deleted successfully", user});

}