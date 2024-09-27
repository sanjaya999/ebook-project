import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./Register.css"
import "../book.png";
import LoadingSpinner from '../Loading/LoadingSpinner';



function Register() {  
  const [isLoading, setIsLoading] = useState(false);
  const [userRegistration, setuserRegistration] = useState({

    fullName : "",
    
    email :"",
    password :"",
    profile : null
  }
  
  );

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

const handleInput = (e)=>{
    const {name , value ,files} = e.target;

    const inputValue = name === "profile"? files[0]:value;
    setuserRegistration({
      ...userRegistration,
       [name] : inputValue
})
}


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  console.log(userRegistration);

  try {
    const formData = new FormData();
    formData.append('fullName', userRegistration.fullName);
    formData.append('email', userRegistration.email);
    formData.append('password', userRegistration.password);
    formData.append('profile', userRegistration.profile);

    const response = await axios.post('https://ebook-project-rho.vercel.app/api/v1/user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log("registration successful", response.data);
    setRegistrationSuccess(true); 
    clearForm();
  } catch (error) {
    console.log("registration failed", error);
    if (error.response && error.response.data) {
      setRegistrationError(error.response.data.message || 'Registration failed. Please try again.');
    } else {
      setRegistrationError('An error occurred. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
}
useEffect(() => {
  if (!registrationSuccess) {
    setRegistrationSuccess(false);
  }
}, [registrationSuccess]);


  return (
    <div className='wholeF'>

{isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
     
       <form action="" onSubmit={handleSubmit} >
       <h1 className='text'>Register</h1>
       {registrationSuccess && <p className="success-message">Registration successful!</p>}
       {registrationError && <p className="error-message">{registrationError}</p>}


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
         <label htmlFor="profile" className='label'>Profile Picture</label><br />
        <input type="file" name='profile' onChange={handleInput} id='profile' />
        </div>
       

        <div className='button'>
          <button type='submit' className='Llogin'>Register</button>
        </div>

        <p className='account'>Already have an account ?  <Link className='log' to="/Login">Login</Link></p>
       </form>
      </>
      )}

    </div>
  )
}

export default Register;