import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

function Login() {
 

  return (
    <div className='middle'>
       
       
        <form action="" >
        <h2 >Login</h2>
            <div className='field'> 
                <label htmlFor="email" className='label'>Email</label> <br />
                <input type="email" className='input' />
            </div>

            <div className='field'>
                <label htmlFor="password" className='label'>Password</label> <br />
                <input type="Password" className='input' />
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