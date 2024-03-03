import React, { useEffect, useState } from 'react'
import UserContext from './Context.js'
import axios from 'axios';
import { useCookies } from 'react-cookie'



const UserContextProvider = ({children})=>{
  const [cookies, setCookie,removeCookie] = useCookies(['access_token', 'refresh_token'])
    const [user, setUser] = useState();
    const [userDetail , setUserDetail] = useState();
    const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const setusername = async()=>{
    setUser(data.data.user.fullName);
  }

    const login = async (credentials) => {
        try {
          console.log(credentials);
          setUserDetail(credentials)
         
          const response = await axios.post('http://localhost:5000/api/v1/user/login', credentials);
          const data = await response.data
          
          

          if(data){
            setUser(data.data.user.fullName);
            setAccessToken(data.data.accessToken)
            setRefreshToken(data.data.refreshToken)
          
            
          }

          
          else{
            console.log("response 200 failed in usercontext");
          }
         
         

          

    //       const accessTokenCookie = response.headers['set-cookie']
    //   .find(cookie => cookie.startsWith('accessToken='));

    //   document.cookie = accessTokenCookie;

    return data;

        } catch (error) {
          console.log("login error", error);
        }

      };
      
  console.log("this is credentials outside scope" , userDetail)
  
   
  
const logout = async () => {
    try {
      
      
        removeCookie('access_token');
        removeCookie('refresh_token');
        localStorage.removeItem('username');
      
        window.location.href = "/Login"
      
         
       
    } catch (error) {
      console.error('Logout failed:', error.message);
     
    }
  };

  


    return (
        <UserContext.Provider value={{user ,login,logout, setUser , setusername , accessToken}}>

            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider ;