import React from 'react'
import "./UserProfile.css"
import axios from "axios"



function UserProfile() {
   
  const token = window.localStorage.getItem("token")
  const _id = window.localStorage.getItem("userID")
  
  const fetchData = async()=>{
    try{ 
      const headers = {
        'Authorization': `Bearer ${token}`
    };
      const response  =  await axios.get("http://localhost:5000/api/v1/user/userId" ,{
        headers: headers,
        data : {_id : _id}
      
      }
    )
          console.log(response.data)
      }
      catch(error){ 
        console.log(error)

}
  }
  fetchData();
    
 

  return (
    <div>
        <h2>My Profile</h2>

   { typeof(token)} <br />
{_id}

    </div>
  )
}

export default UserProfile;