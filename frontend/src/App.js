import logo from './logo.svg';
import Header from './components/Header';
import Blogs from './components/Blogs';
import Signup from './components/Signup';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import UserBlogs from './components/UserBlogs';
import Update from './components/Update';
import Detail from './components/Detail';
import React from 'react';
import { useSelector } from 'react-redux';

import {Routes,Route} from "react-router-dom";
import Login1 from './components/Login1';

 function App() {

   
   
  const isloggedIn =useSelector((state)=>state.user.isloggedIn);
  


  return <React.Fragment>
     
  <header>
  <Header/>
  
  </header>
  <main>
  {isloggedIn&&<Login1/>}
  <Routes>
  <Route exact path="/signup"  element={<Signup/>}/>
  <Route exact path="/login"  element={<Login/>}/>
  {isloggedIn&&<Route exact path="/blogs"  element={<Blogs/>}/>}
  {isloggedIn&&<Route exact path="/user/blogs" element={<UserBlogs/>}/>}
  {isloggedIn&&<Route exact path="/user/add/blogs" element={<AddBlog/>}/>}
  {isloggedIn&&<Route exact path="/user/blogs/update/:id"  element={<Update/>}/>}
  {isloggedIn&&<Route exact path="/user/blogs/detail/:id"  element={<Detail/>}/>}
  
  <Route/>
  
  </Routes>
  
  
  </main>
  
  
  </React.Fragment>

  
 

}

export default App;
