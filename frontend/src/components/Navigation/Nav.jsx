import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { IoMdHome } from "react-icons/io";
import { MdExploreOff } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import UserContext from "../../Context/Context.js";
import { useCookies } from 'react-cookie'






function Nav() {
  const [cookies, setCookie,removeCookie] = useCookies(['access_token', 'refresh_token'])


    const {user ,logout ,accessToken} = useContext(UserContext);
    
    const name = window.localStorage.getItem("username")
    const handleLogout = ()=>{
       
       
  try {
    
    
      removeCookie('accessToken');
      removeCookie('refreshToken');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('loggedIn');
    
      window.location.href = "/Login"
    
       
     
  } catch (error) {
    console.error('Logout failed:', error.message);
   
  }
  
    }
  
  return (
    
    <header>
      <nav>
        <div className="navigation">
          <ul className="navlink">
            <li>
              <NavLink to="/Home"  className ={ ({isActive})=> `${isActive? "yes-nav-text" : "no-nav-text"}`}>
              <IoMdHome className="icons"/>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Explore" className ={ ({isActive})=> `${isActive? "yes-nav-text" : "no-nav-text"}`}>
              <MdExploreOff className="icons" />
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/Top" className ={ ({isActive})=> `${isActive? "yes-nav-text" : "no-nav-text"}`}>
                Top Picks
              </NavLink>
            </li>
            {name ?(
              <li className="start">
                <NavLink to="/user" className="logname">{name}</NavLink>
                <button onClick={handleLogout} className="login">
                  Logout
                </button>
              </li>
            ) : (
              <li className="start">
                <NavLink to="/Login" className="login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
    
  );
}

export default Nav;
