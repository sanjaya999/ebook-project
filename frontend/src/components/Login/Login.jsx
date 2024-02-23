import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import axios from "axios"


function Login() {
 
    const[userlogin , setuserlogin] = useState({
        email : "",
        password : ""
    });

    const handleInput = (e)=>{
        const {name , value} = e.target;
        setuserlogin({
            ...userlogin,
            [name]:value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/v1/user/login',userlogin);
            console.log("user Loggedin" , response.data);

        }
        catch(error){
            console.log("registration failed" , error.response.data);
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
                <button type='submit' >Login</button>
            </div>


            <div className="register">
            <h3>Dont have an Account ? </h3>  <Link className='a' to="/Register" >Register</Link>

            </div>
            
        </form>

       

    </div>
  )
}

export default Login