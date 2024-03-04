import React from 'react'
import "./UserProfile.css"
import axios from "axios"



function UserProfile() {
   
  const token = window.localStorage.getItem("token")
    try{ 
      const headers = {
        'Authorization': `Bearer ${token}`
    };
      const response  = axios.get("http://localhost:5000/api/v1/user/userId" ,{
        headers: headers
      
      }
    )
          console.log(response.data)
      }
      catch(error){
        console.log(error)

}
 

  return (
    <div>
        <h2>My Profile</h2>

   {token}


    </div>
  )
}

export default UserProfile;