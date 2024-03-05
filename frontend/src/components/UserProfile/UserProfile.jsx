import React from 'react'
import "./UserProfile.css"
import axios from "axios"



function UserProfile() {
   
  const token = window.localStorage.getItem("token")
  const _id = window.localStorage.getItem("userID")
  

  // problem in fetching data
  const fetchData = async()=>{
    try{ 
      const data = { _id: _id }; 
      const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: { _id: _id }
    };
      
      const response  =  await axios.get("http://localhost:5000/api/v1/user/userId",config,data
    )
          console.log("this is from userprofile :" , response.data)
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