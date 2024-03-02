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

const App = () =>{
  const [cookies] = useCookies(['access_token', 'refresh_token']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const loggedIn = cookies.access_token && cookies.refresh_token;
    console.log("app.jsx loggedIn:", isLoggedIn);
    setIsLoggedIn(loggedIn);
    
  }, [cookies]);
 return (

  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="Home" element={<Home />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Top" element={<Top />} />
        <Route path='Login' element={
          isLoggedIn? <UserProfile/> : <Login/>} />
        <Route path='Register' element={<Register />} />
        <Route path='user' element={<UserProfile/>}/>
      </Route> 
    </Routes>
  </Router>

);
 }

export default App;
