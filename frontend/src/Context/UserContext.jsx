import React, { useEffect, useState } from 'react'
import UserContext from './Context.js'
import axios from 'axios';



const UserContextProvider = ({children})=>{
    const [user, setUser] = useState();
    const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

    const login = async (user) => {
        try {
          console.log(credentials);
          const response = await axios.post('http://localhost:5000/api/v1/user/login', user);
          const data = await response.json();
          const res = response.data.data

          if(response ===200){
            setUser(data.user);
           console.log(res);
            console.log(accessToken );
            console.log(refreshToken );
          }


          document.cookie = `accessToken=${accessToken}; Path=/; Secure; HttpOnly`;
          document.cookie = `refreshToken=${refreshToken}; Path=/; Secure; HttpOnly`;


    //       const accessTokenCookie = response.headers['set-cookie']
    //   .find(cookie => cookie.startsWith('accessToken='));

    //   document.cookie = accessTokenCookie;

    return data;

        } catch (error) {
          console.log("login error", error);
        }
      };
    
  
const logout = async (accessToken) => {
    try {
        
        const response = await axios.post('http://localhost:5000/api/v1/user/logout', {
          
          headers: {
           
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
        });
    
       
        if (response.status === 200) {
            setAccessToken(null);
            setRefreshToken(null);
        
          document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
          document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
          setUser(null);
          
        } else {
          console.log("error occured during logout usercontext")
        }
    } catch (error) {
      console.error('Logout failed:', error.message);
     
    }
  };


    return (
        <UserContext.Provider value={{ user ,login,logout, setUser}}>

            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider