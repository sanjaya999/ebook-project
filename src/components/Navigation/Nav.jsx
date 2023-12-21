import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { IoMdHome } from "react-icons/io";
import { MdExploreOff } from "react-icons/md";


function Nav() {
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
            <li>
              <NavLink to="/search" className ={ ({isActive})=> `${isActive? "yes-nav-text" : "no-nav-text"}`}>
                Search
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
