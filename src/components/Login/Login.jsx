import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
 

  return (
    <div>
        <h2>Login</h2>

        <form action="" >
            <div>
                <label htmlFor="email" className='label'>Email</label>
                <input type="email" className='input' />
            </div>

            <div>
                <label htmlFor="password" className='label'>Password</label>
                <input type="Password" className='input' />
            </div>

            <div>
                <button type='submit' >Login</button>
            </div>


        </form>

        <h1>Dont have an Account ? </h1>  <Link to="/Register" >Register</Link>

    </div>
  )
}

export default Login