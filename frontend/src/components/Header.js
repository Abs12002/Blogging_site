import React, { useState } from 'react';
import {AppBar, Toolbar,Typography,Box,Button,Tabs,Tab} from '@mui/material'
import {
 
  Link, 
} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from "../store/currentUser"
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';





 const  Header = ()=> {
   const isloggedIn=useSelector((state)=>state.user.isloggedIn);
   const name=useSelector((state)=>state.blog.name);
   
   
  
  
   const [value,setValue]=useState();
   const dispatch=useDispatch();
  return <AppBar position="sticky" sx={{background:"#80cbc4"}}> 
    
    <Toolbar >
    <Typography variant="h4" sx={{color:"white"}}> BlogsApp</Typography>
    <Box display="flex" margin="auto">
    <Tabs value={value}  onChange={(e,val) =>setValue(val)} >
 
   {isloggedIn&& <>
     
    
   

     <Button LinkComponent={Link} to ="/blogs" > <AutoAwesomeIcon style={{ color: "white", fontSize:40, margin:30 }} /></Button>

<Button LinkComponent={Link} to ="/user/blogs" > <AutoModeIcon style={{ color: "white", fontSize:40, margin:30 }} /></Button>

<Button LinkComponent={Link} to ="/user/add/blogs" > <AddModeratorIcon style={{ color: "white", fontSize:40, margin:30 }} /></Button>
</>
}

    
    
    </Tabs>
    {isloggedIn&&<VerifiedUserIcon style={{ color: "white", fontSize:20,marginLeft:50 ,marginTop:10 }} />}
    {isloggedIn&&name&&<Button    LinkComponent={Link} to ="/login"      sx={{margin:3,marginRight:'0' ,color:"white"}}>hello {name}</Button>}
 {!isloggedIn&&<Button    LinkComponent={Link} to ="/login"     varient ='contained' sx={{margin:3,backgroundColor:"white ",marginRight:'0' ,color:"warning"}}>Login</Button>}
 {!isloggedIn&&<Button  LinkComponent={Link} to ="/signup"   varient ='contained' sx={{margin:3 ,backgroundColor:"white",marginRight:'0',color:"warning"}}>Signup</Button>}
  {isloggedIn&&<Button LinkComponent={Link} to ="/login"  onClick ={()=>dispatch(allActions.logout())} color="success"  varient ='contained' sx={{margin:3 ,backgroundColor:"white",marginRight:'0'}}>LogOut</Button>}
  

  </Box>
    </Toolbar>
    </AppBar>
    
    
  
}
export default Header;
