import React,{useState,useEffect} from 'react';
import {AppBar, Toolbar,Typography,Box,Button,Tabs,Tab, InputLabel,TextField,
  CardHeader,Avatar,CardMedia,CardContent,Card} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux';

import { useNavigate,useParams } from "react-router-dom";

const axios  = require('axios');



function AddBlog() {
  
  const blog_id=useParams().id;
  const dispatch=useDispatch();
  const nav = useNavigate();
  const [blog, setBlog] = useState();
  
  const [inputs, setInputs] = useState();
  const sendReqs1=async ()=>{
    const res =  await axios.put(`http://localhost:5000/api/blog/update/${blog_id}`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.image
      
    }).catch((error)=>{
      
    if(error.response) 
        console.log(error.response); 
    else if(error.request) 
            console.log("error.request"); 
    else if(error.message) 
          console.log("error.msg"); 
               }
      
    );

      
      
        const data= await res.data;
        console.log(res);
      return data;
  }
  const sendReqs= async ()=>{
   
    
   const res =  await axios.get(`http://localhost:5000/api/blog/${blog_id}`).catch((error)=>{
      
    if(error.response) 
        console.log(error.response); 
    else if(error.request) 
            console.log("error.request"); 
    else if(error.message) 
          console.log("error.msg"); 
               }
      
    );

      
      
        const data= await res.data;
        console.log(res);
      return data;
     
      
  }

  useEffect(() => {
    sendReqs().then(data=>{
      setBlog(data.blogs)
      setInputs({
        title:data.blogs.title,
        description:data.blogs.description,
        image:data.blogs.image
        
      })
    })
  }, [blog_id])
  console.log(blog);
  
  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendReqs1().then(nav("/user/blogs"));
    console.log(inputs);
    
    
    
  }
  return (
   
   <div>
   {blog&&(
   <Card sx={{ width: "40%" , margin:'auto',mt:2,padding:2,boxShadow:"10px 10px 20px #ccc",":hover":{
    boxShadow:"5px 5px 30px black"
} }}>
  <CardHeader
   
    
    title={inputs.title} 
    
  />
  <CardMedia
    component="img"
    height="300"
    image={inputs.image}
    alt="Paella dish"
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      {inputs.description}
    </Typography>
    
    <Typography variant="body2" color="text.secondary">
     
     By: <b>{blog.user_id.name}</b>
     
    </Typography>
  </CardContent>
  
</Card>
)}
   {inputs&&(
   <form onSubmit={handleSubmit} method="PUT">
   <Box 
   display="flex" 
   flexDirection={"column"}
   alignItems={"center"}
   justifyContent={"center"}
   boxShadow="10px 10px 20px #ccc "
   padding={3}
   margin='auto'
   marginTop={5}
   borderRadius={5}
   maxWidth={400}>
   <Typography padding={1} textAlign="center" variant='h2'> Edit your blog</Typography>
   
   <TextField name="title" onChange={handleChange}  value={inputs.title}  placeholder="Title" type={"text"} margin="normal"/>
   <TextField name="description" onChange={handleChange}  value={inputs.description}  placeholder="Description" type={"text"} margin="normal"/>
   <TextField name="image" onChange={handleChange} value={inputs.image}  placeholder="ImageURL" type={"text"} margin="normal"/>
   
   <Button  type="submit" sx={{ borderRaduis:3, marginTop:3}}color="warning" variant="contained"> Submit</Button>
   
   </Box>
   
   </form>)
   
  }
   </div>
  
  )
}

export default AddBlog;