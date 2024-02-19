import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';




function Register() {  
 
  const [userRegistration, setuserRegistration] = useState({

    fullname : "",
    
    email :"",
    password :"",
    profile : null
  }
  
  );


const handleInput = (e)=>{
    const {name , value ,files} = e.target;

    const inputValue = name == "profile"?[0]:value;
    setuserRegistration({
      ...userRegistration,
       [name] : value
})
}




const handleSubmit= async(e)=>{
  e.preventDefault();
  console.log(userRegistration); // if we are getting or not

  //send data
  try {
    const response = await axios.post('http://localhost:5000/api/v1/user/register',userRegistration);
    console.log("registration successfull",response.data)
  } catch (error) {
    console.log("registration failed",error.response.data)
    
  }

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
          <label htmlFor="profile" className='profile'>Profile</label>
          <input type="file" name="profile" value={userRegistration.files} onChange={handleInput} />
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