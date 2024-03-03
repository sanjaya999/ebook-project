import React from 'react'
import "./UserProfile.css"
import axios from "axios"


function UserProfile() {
    
  const token = window.localStorage.getItem("token")

  const response  = axios.get("http://localhost:5000/api/v1/userDetail" , {
    header : {
      Authorization : `Bearer ${token}`
    }
  })
  console.log(response.data)

  return (
    <div>
        <h2>My Profile</h2>

   {token}


    </div>
  )
}

export default UserProfile;