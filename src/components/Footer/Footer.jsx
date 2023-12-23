import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";





function Footer() {
  return (
    <>
      <div className="foot">
        <ul className="foote">
          <li>
            <NavLink
              to="/Home"
              className={({ isActive }) =>
                `${isActive ? "yes-nav-text" : "no-nav-text"}`
              }
            >
              Home{" "}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Explore"
              className={({ isActive }) =>
                `${isActive ? "yes-nav-text" : "no-nav-text"}`
              }
            >
              Explore
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/Top"
              className={({ isActive }) =>
                `${isActive ? "yes-nav-text" : "no-nav-text"}`
              }
            >
              Top Picks
            </NavLink>
          </li>
        </ul>
        
        <div className="social-media-section">
      <h3>Find us on</h3>
      <div className="social-icons">
        <FaFacebook />
        <FaInstagramSquare />
        <FaTwitter />
        <FaYoutube />

        <h6>Email:ebook2998@gmail.com</h6>
        <h6>Tel: 01-XXXXXX</h6>
      </div>
    </div>

    
        

        <p>&copy; 2023 Your Ebook Website. All rights reserved.</p>
      </div>
    </>
  );
}

export default Footer;
