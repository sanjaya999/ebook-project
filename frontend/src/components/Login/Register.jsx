import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Register.css"
import "../book.png";



function Register() {  
 
  const [userRegistration, setuserRegistration] = useState({

    fullName : "",
    
    email :"",
    password :"",
    profile : null,
  }
  
  );


const handleInput = (e)=>{
    const {name , value ,file} = e.target;

    const inputValue = name === "profile"?file[0]:value;
    setuserRegistration({
      ...userRegistration,
       [name] : inputValue,
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
    <div className='wholeF'>
      <img src="book.png" alt="" />
       <form action="" onSubmit={handleSubmit} >
       <h1 className='text'>Register</h1>


        <div className='fullName'>
            <label htmlFor="fullName" className='label'>Full Name</label><br />
            <input type="text" name='fullName'
            value={userRegistration.fullName} className='input'
            onChange={handleInput} id='fullname'  />
        </div>



        <div className='email'>
            <label htmlFor="email" className='label'>Email</label><br />
            <input  type="text" name='email' 
             value={userRegistration.email}  className='input'
             onChange={handleInput} id='email'  />
        </div>

        <div className='password'> 
            <label htmlFor="password" className='label'>Password</label><br />
            <input type="password" name='password' 
             value={userRegistration.password} className='input'
             onChange={handleInput} id='password'  />
        </div>

        <div className='profile'> 
            <label htmlFor="profile" className='label'>Profile</label><br />
            <input type="file" name='profile' 
            value={userRegistration.profile} 
             className='input'
             onChange={handleInput} id='profile'  />
        </div>
       

        <div className='button'>
          <button type='submit' className='Llogin'>Register</button>
        </div>

        <p className='account'>Already have an account ?  <Link className='log' to="/Login">Login</Link></p>
       </form>
      

    </div>
  )
}

export default Register;