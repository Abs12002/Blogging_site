import React ,{useEffect,useState}from 'react'
import Card from './Card';
import {runFireworks} from "./Enjoy"
const axios  = require('axios');


function Blogs() {
  const [blogs, setBlogs] = useState();
  let data;
  const sendReqs= async ()=>{
    const res=await axios.get("http://localhost:5000/api/blog").catch((err)=>{console.log(err)});
     data = await res.data;
    
    //console.log(data.blogs);
                           }
  useEffect(() => {
    runFireworks();

    sendReqs().then(()=>setBlogs(data.blogs));

  },[])
  
  return (
    <div>
    {blogs&&blogs.map((blog , index)=>(
      <Card 
      key={index}
      created_at={blog.created_at}
      blog_id={blog._id}
      title={blog.title} 
      name={blog.user_id.name} 
      image={blog.image}  
      description={blog.description}
      truth={localStorage.getItem("userId")==blog.user_id._id}/>

    ))}
    </div>
    
  )
}

export default Blogs