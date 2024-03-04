import React from 'react';
import { useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import axios from "axios"
import UserContext from '../../Context/Context.js';
import { useCookies } from 'react-cookie'




function Login() {
    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken'])
 
    const {login} = useContext(UserContext)
   
    const[userlogin , setuserlogin] = useState({
        email : "",
        password : ""
    });

    const handleInput = (e)=>{
        const {name , value} = e.target;
        
        setuserlogin({
            ...userlogin,
            [name] :value
        })
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
             
             
            //  console.log(userlogin);

            //  const res = await login(userlogin)

            const response = await axios.post('http://localhost:5000/api/v1/user/login', userlogin);

            
            const accessToken = response.data.data.accessToken
            console.log(accessToken)
            const refreshToken = response.data.data.refreshToken
            const name = response.data.data.user.fullName
            const userid = response.data.data.user._id
            console.log("this is username:",name);
            let expires = new Date()
            expires.setTime(expires.getTime() + (1 * 60 * 60 * 1000))
           
            console.log("user LoggedIn" , response.data);

            if(response.status) { 
                window.localStorage.setItem("token" , accessToken)
                window.localStorage.setItem("loggedIn" , true)
                window.localStorage.setItem("username",name)
                window.localStorage.setItem("userID", userid)
                
                setCookie('accessToken', accessToken, { path: '/',  expires})
                setCookie('refreshToken', refreshToken, {path: '/', expires})
                

            }

        }
        catch(error){
            console.log("login failed in login.jsx" , error);
        }
    }

 

  return (
    <div className='middle'>
       
       
        <form action=""  onSubmit={handleSubmit}>
        <h2 >Login</h2>
            <div className='field' > 
                <label htmlFor="email" className='label'>Email</label> <br />
                <input type="email" className='input' name='email'
                value={userlogin.email}
                onChange={handleInput} id='email'/>
            </div>

            <div className='field'>
                <label htmlFor="password" className='label'>Password</label> <br />
                <input type="Password" className='input' name='password'
                onChange={handleInput} value={userlogin.password} id='password'/>
            </div>

            <div>
                <button className="Llogin" type='submit' >Login</button>
            </div>


            <div className="register">
            <h3>Dont have an Account ? </h3>  <Link className='a' to="/Register" >Register</Link>

            </div>
            
        </form>

       

    </div>
  )
}

export default Login;