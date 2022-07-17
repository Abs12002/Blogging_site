import React,{useState} from 'react';
import {AppBar, Toolbar,Typography,Box,Button,Tabs,Tab, InputLabel,TextField} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux';
import {blogActions} from "../store/currentUser"
import {allActions} from "../store/currentUser"
import { useNavigate } from "react-router-dom";
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
//import * as React from 'react';
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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';


const axios  = require('axios');



function Login() {
  const theme = createTheme();
  let data;
  const dispatch=useDispatch();
  const nav = useNavigate();
  const [isSignUp, setisSignUp] = useState(false);
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
  })
  const sendReqs= async (type ="login")=>{
   
    
   const res =  await axios.post(`http://localhost:5000/api/user/${type} `,
  
    { 
      name:inputs.name,
       email:inputs.email,
      password:inputs.password
      
     

    }).catch((error)=>{
      
    if(error.response) 
        console.log(error.response); 
    else if(error.request) 
            console.log("error.request"); 
    else if(error.message) 
          console.log("error.msg"); 
               }
      
    );

      
      
         data= await res.data;
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
    if(isSignUp)sendReqs("signup").then((data)=>localStorage.setItem("userId" , data.user._id)).then(()=>dispatch(allActions.login())).then(()=>dispatch(blogActions.idProvider(data.user.name))).then(()=>nav("/blogs"))
    
    else sendReqs().then((data)=>localStorage.setItem("userId" ,data.user._id)).then(()=>dispatch(allActions.login())).then(()=>dispatch(blogActions.idProvider(data.user.name))).then(()=>nav("/blogs"))
    
  }
  

 
  

  return (
   <div>
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
          <Avatar sx={{ m: 1, bgcolor: '#80cbc4' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {!isSignUp?"Login":"SignUp"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
   
   {isSignUp&&<TextField 
    required
  fullWidth
  autoComplete="name"
              autoFocus
              label="Name"
    name="name" 
    onChange={handleChange}  
    value={inputs.name} 
     placeholder="Name" 
     type={"text"}
      margin="normal"/>}
   <TextField 
   required
  fullWidth
     autoComplete="email"
              autoFocus
              label="Email Address"
   name="email" 
   onChange={handleChange}  
   value={inputs.email}  
   placeholder="Email"
   type={'email'}
    margin="normal"
    />

   <TextField
   required
  fullWidth 
  autoComplete="password"
              autoFocus
              label="Password"
   name="password" 
   onChange={handleChange} 
   value={inputs.password}  
   placeholder="Password" 
   type={"password"} 
   margin="normal"/>
   
   <Button  
   type="submit" 
   
   sx={{ m: 1, bgcolor: '#80cbc4',borderRaduis:3, marginTop:3 }}  variant="contained"><SendTimeExtensionIcon /></Button>
   <Button onClick={()=>setisSignUp(!isSignUp)} sx={{ borderRaduis:3}}>Change {isSignUp?"Login":"SignUp"}</Button>
   </Box>
   
   
        </Box>
      
      </Container>
    </ThemeProvider>
   

    </div>
   
  
  )
}

export default Login