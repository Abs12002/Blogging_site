import React from 'react'
import {CardHeader,Avatar,CardMedia,CardContent,Typography,Card,Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import { useNavigate } from "react-router-dom";
const axios=require('axios');

const  Caard=({key, blog_id,title, name ,image,description,truth,created_at} )=> {
    const Navigate=useNavigate();
  const sendR= async ()=>{
    const res=await axios.delete(`http://localhost:5000/api/blog/${blog_id}`).catch((error)=>{
      
      if(error.response) 
          console.log("error.response"); 
      else if(error.request) 
              console.log("error.request"); 
      else if(error.message) 
            console.log("error.msg"); 
                 }
        
      );

  }
  const handleClick= async()=>{
    Navigate(`/user/blogs/update/${blog_id}`);
  } 
  const handleDetail= async()=>{
    Navigate(`/user/blogs/detail/${blog_id}`);
          }
  const handleDelete= async()=>{
    
    sendR().then(()=>Navigate("/blogs"));
  }
  return (
    <div>
    <Card sx={{ width: "40%" , margin:'auto',mt:2,padding:2,boxShadow:"10px 10px 20px #ccc",":hover":{
        boxShadow:"5px 5px 30px black"
    } }}>
      <CardHeader
       
        
        title={title} 
        
        
      />
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>{description} </b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        
         By:  <b>{name}</b>
         <Typography variant="body2" color="text.secondary">
          created_at {created_at}
        </Typography>
        </Typography>
       {truth&& <Button   onClick={handleClick}  varient ='contained' sx={{margin:3,marginRight:'0' ,color:"black"}}><ModeEditIcon/></Button>}
        {truth&&<Button   onClick={handleDelete}  varient ='contained' sx={{margin:3,marginRight:'0' ,color:"black"}}><DeleteIcon/></Button>}
        <Button   onClick={handleDetail}  varient ='contained' sx={{margin:3,marginRight:'0' ,color:"black"}}><PrivacyTipOutlinedIcon/></Button>

      </CardContent>
      
    </Card>
    </div>

  )
}

export default Caard;