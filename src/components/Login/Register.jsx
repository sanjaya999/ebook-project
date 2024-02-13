import React, { useState } from 'react';

import { Link } from 'react-router-dom';




function Register() {  

  const [userRegistration, setuserRegistration] = useState({

    fullname : "",
    username :"",
    email :"",
    password :""
  });

const handleInput = (e)=>{
    const {name , value} = e.target;
    setuserRegistration({
      ...userRegistration,
       [name] : value
})
}


const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(userRegistration); // if we are getting or not

}
  return (
    <div>
       <form action="" onSubmit={handleSubmit} >
        <div className='fullName'>
            <label htmlFor="fullname" className='label'>Full Name</label>
            <input type="text" name='fullname'
            value={userRegistration.fullname} className='input'
            onChange={handleInput} id='fullname'  />
        </div>

        <div>
            <label htmlFor="username" className='label'>Username</label>
            <input  type="text" name='username' 
            value={userRegistration.username} className='input'
            onChange={handleInput} id='username'  />
        </div>

        <div>
            <label htmlFor="email" className='label'>Email</label>
            <input  type="text" name='email' 
             value={userRegistration.email}  className='input'
             onChange={handleInput} id='email'  />
        </div>

        <div>
            <label htmlFor="password" className='label'>Password</label>
            <input type="password" name='password' 
             value={userRegistration.password} className='input'
             onChange={handleInput} id='password'  />
        </div>

        <div>
          <button type='submit'>Register</button>
        </div>


       </form>
       <p>Already have an account ?  <Link to="/Login">Login</Link></p>

    </div>
  )
}

export default Register;