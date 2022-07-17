import React ,{useEffect,useState} from 'react';
import User_Card from './User_Card';
import {useSelector} from "react-redux"
const axios  = require('axios');
 

const UserBlogs = () => {
  const name=useSelector((state)=>state.blog.name);
let data;
  const[blogs,setBlogs] =useState();
  const id=localStorage.getItem("userId");
  const sendReqs= async ()=>{
  const res=await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err)=>{console.log(err)});;
   data=await res.data;
  return data;

  }

   useEffect(() => {
    sendReqs().then((data)=>setBlogs(data.blogs));
    
  }, [])
  

  return (
    <div>
    {blogs&& blogs.map((blog,index)=>(
      <User_Card 
      key={index}
      created_at={blog.created_at}
      title={blog.title}
      name={name}
      image={blog.image}  
      description={blog.description}
      blog_id={blog._id}/>
  ))}
    </div>
  )
}

export default UserBlogs;