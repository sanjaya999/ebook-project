import { useState , useEffect } from "react"
import React from 'react'
import "./UserProfile.css"
import axios from "axios"
import {NavLink} from "react-router-dom"





function UserProfile() {
   
  const token = window.localStorage.getItem("token");
  const _id = window.localStorage.getItem("userID");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { _id };
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: { _id }
        };

        const response = await axios.get("https://ebook-project-taupe.vercel.app/api/v1/user/userId", config, data);
        console.log("this is from userprofile :", response.data);
        const { fullName, email, createdAt, profile, _id: userId } = response.data.data.user;
        

        setUserData({ fullName, email, createdAt, profile, userId }); // Update the state with all user data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, _id]);
 

  return (
    <div>
        <h2>My Profile</h2>

        <div className="userDetail">
        <div className="userImageContainer">

           <img className="userImage" src={userData.profile} alt="Profile" />
           </div>


           <div className="otherDetail">

            <div className="fullName">Name : {userData.fullName}</div>
            <div className="email"> User Email : {userData.email}</div>
            <div className="createdAt">Account Created At :{userData.createdAt}</div>
            <div className="userId"> User ID : {userData.userId}</div>
           </div>

        </div>

        <div className="upload">
          <NavLink to="/upload">Upload your own ?</NavLink>
        </div>


    </div>
  )
}

export default UserProfile;