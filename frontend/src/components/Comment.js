import React,{useState} from 'react';


import {CardHeader,Avatar,CardMedia,CardContent,Typography,Card,Button} from "@mui/material";

const Comment=({cmnt,user_id,truth})=>{
    
    

return (
    
    <div>
    <Typography  
    display="flex" 
   flexDirection={"column"}
   alignItems={"center"}
   justifyContent={"center"}
   boxShadow="1px 1px 1px #ccc "
   padding={1}
   margin='auto'
   marginTop={1}
   maxWidth={500}
    variant="contained" sx={{ borderRaduis:3,margin:"auto"}}>By: {user_id} {cmnt}</Typography>
    {truth&&<h4>edit your comment</h4>}
      
    </div>
)

}
export default Comment;