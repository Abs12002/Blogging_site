import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Comment from './Comment';
import User_Card from './User_Card';
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';


import {CardHeader,Avatar,CardMedia,CardContent,Typography,Card,Button,TextField,form,Box} from "@mui/material";
const axios = require('axios');

const Detail=()=> {

  const nav = useNavigate();
  const [inputs,setInputs] =useState({
    comment:"",
    
  })

    const blog_id=useParams().id;
  
    const [blog,setBlog]=useState();
    const [cmt,setCmt]=useState();
    let data,cmnts;
    const blogResq= async ()=>{
        const res=await axios.get(`http://localhost:5000/api/blog/${blog_id}`).catch(err=>console.log(err));
         data=await res.data;
         //cmnts= await data.comment;
         // console.log(cmnts);
         return data;
                              }

useEffect(() => {
 blogResq().then(()=>setBlog(data.blogs)).then(()=>setCmt(data.blogs.comments));
}, [blog_id])
//console.log(cmt.length);
const handleChange = (e) => {
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value
  
  }))
    
}
  const sendCmt= async()=>{
    const res= await axios.post("http://localhost:5000/api/comments/add/comments",{
    comment:inputs.comment,
    blog_id:blog_id,
    user_id:localStorage.getItem("userId")
  }).catch(err =>console.error(err));


  }
const handleSubmit=  ()=>{

  sendCmt();
  nav("/user/blogs")


}



  return (
  <div>


  
   { blog&& <User_Card 
   
   title={blog.title}
   created_at={blog.created_at}
   name={blog.user_id.name}
   image={blog.image}  
   description={blog.description}
   blog_id={blog._id}/>}
   <form onSubmit={handleSubmit} method="POST">
   <Box 
   display="flex" 
   flexDirection={"column"}
   alignItems={"center"}
   justifyContent={"center"}
   boxShadow="2px 2px 3px #ccc "
   maxWidth={500}
   
   color="#FFFF"
  
   
   borderRadius={10}
 >
   
 
   <TextField name="comment" onChange={handleChange} value={inputs.comment}  placeholder="write your comment here" type={"text"} borderRadius={10} margin="normal"/>
   <Button  type="submit" > <SendTimeExtensionOutlinedIcon  style={{ fontSize: 40, color:"black" }} /></Button>
   
   
 
   </Box>
   
   </form>

  {blog&&cmt.length>0&&cmt.map((blogss , index)=>(
     <Comment
    key={index}

    cmnt={blogss.comment}
    user_id={blogss.user_id}
    truth={localStorage.getItem("userId")===blogss.user_id}
    />
  ))}
  
  
  </div>
  )
  
}

export default Detail