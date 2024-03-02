// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Nav from './components/Navigation/Nav';
import Home from './components/Home/Home';
import Explore from './components/Explore/Explore';
import Top from './components/Top Picks/Top';
import Login from './components/Login/Login'; 
import Register from './components/Login/Register.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';

const App = () =>{
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  console.log( "app.jsx loggedin :" , isLoggedIn);
 return (

  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="Home" element={<Home />} />
        <Route path="Explore" element={<Explore />} />
        <Route path="Top" element={<Top />} />
        <Route path='Login' element={
          isLoggedIn == "true"? <UserProfile/> : <Login/>} />
        <Route path='Register' element={<Register />} />
        <Route path='user' element={<UserProfile/>}/>
      </Route> 
    </Routes>
  </Router>

);
 }

export default App;
