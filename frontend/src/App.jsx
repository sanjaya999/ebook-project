// App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Top from './components/Top Picks/Top';
import Login from './components/Login/Login'; 
import Register from './components/Login/Register.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import { useCookies } from 'react-cookie';
import Upload from './components/Upload/Upload.jsx';
import Admin from './components/UserProfile/Admin.jsx';
import Foryou from './components/ForYou/Foryou.jsx';


const App = () =>{
  const [cookies] = useCookies(['accessToken', 'refreshToken', "isAdmin"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin , setisAdmin] = useState(false)


  useEffect(() => {
    const loggedIn = cookies.accessToken && cookies.refreshToken && cookies.isApproved == true;
    const isAdmin = cookies.isAdmin

    setisAdmin(isAdmin)
    setIsLoggedIn(loggedIn);

    
    
  }, [cookies]);
 return (

  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="foryou" element={<Foryou />} />
        <Route path="Home" element={<Home />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Top" element={<Top />} />
        <Route path='Login' element={
          isLoggedIn? <UserProfile/> : <Login/>} />
        <Route path='Register' element={<Register />} />
        <Route path='user' element={
          isLoggedIn? <UserProfile/> : <Login/>}/>
        <Route path='upload' element={  isLoggedIn? <Upload/>:<Login/>}/>
        <Route path='admin' element={  isAdmin? <Admin/>:<UserProfile/>}/>


      </Route> 
    </Routes>
  </Router>

);
 }

export default App;
