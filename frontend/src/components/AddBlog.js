import React,{useState} from 'react';
import {AppBar, Toolbar,Typography,Box,Button,Tabs,Tab, InputLabel,TextField} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';

import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
//import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
//import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const axios  = require('axios');



function AddBlog() {
  const theme = createTheme();
  
  const dispatch=useDispatch();
  const nav = useNavigate();
  
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    image:""
    
  })
  const sendReqs= async ()=>{
   
    
   const res =  await axios.post('http://localhost:5000/api/blog/add',
  
    { 
      title:inputs.title,
      description:inputs.description,
      image:inputs.image,
      user_id:localStorage.getItem('userId')
      
     

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
  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendReqs().then(nav("/user/blogs"));
    
    
    
  }
  return (
   
   
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00796b' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Add your Blog
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
   
   <TextField 
   required
  fullWidth
     autoComplete="title"
              autoFocus
              label="title"
   name="title" onChange={handleChange}  value={inputs.title}  placeholder="Title" type={"text"} margin="normal"/>
   <TextField 
   required
   fullWidth
      autoComplete="description"
               autoFocus
               label="Description"
   name="description" onChange={handleChange}  value={inputs.description}  placeholder="Description" type={"text"} margin="normal"/>
   <TextField 
   required
   fullWidth
      autoComplete="image"
               autoFocus
               label="image"
   name="image" onChange={handleChange} value={inputs.image}  placeholder="ImageURL" type={"text"} margin="normal"/>
   
   <Button  
   type="submit" 
   
   sx={{ m: 1, bgcolor: '#00796b',borderRaduis:3, marginTop:3 }}  variant="contained"><SendTimeExtensionIcon /></Button>
   
   </Box>
   </Box>
   
   </Container>
   </ThemeProvider>
  
  )
}

export default AddBlog;