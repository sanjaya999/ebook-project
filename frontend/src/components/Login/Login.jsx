import React from 'react';
import { useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"
import axios from "axios"
import UserContext from '../../Context/Context.js';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';



function Login() {
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken'])
 
    const {login} = useContext(UserContext)
   
    const[userlogin , setuserlogin] = useState({
        email : "",
        password : ""
    });
    const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e)=>{
        const {name , value} = e.target;
        
        setuserlogin({
            ...userlogin,
            [name] :value
        })
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        setIsLoading(true);
    
        // Validate the input fields
        if (userlogin.email === '') {
          setEmailError(true);
          setIsLoading(false);
          return;
        }
    
        if (userlogin.password === '') {
          setPasswordError(true);
          setIsLoading(false);
          return;
        }

        try{
             
             
            //  console.log(userlogin);

            //  const res = await login(userlogin)

            const response = await axios.post('https://ebook-project-rho.vercel.app/api/v1/user/login', userlogin);

            
            const accessToken = response.data.data.accessToken
            console.log(accessToken)
            const refreshToken = response.data.data.refreshToken
            const name = response.data.data.user.fullName
            const admin =  response.data.data.user.isAdmin
            const isApproved = response.data.data.user.isApproved
            const userid = response.data.data.user._id
            console.log("this is username:",name);
            let expires = new Date()
            expires.setTime(expires.getTime() + (1 * 60 * 60 * 1000))
           
            console.log("user LoggedIn" , response.data.data);

          

            if(response.data.data.user.isApproved){
                setCookie('isApproved', isApproved, {path: '/', expires, sameSite: 'None', secure: true })
                }
            if(response.data.data.user.isAdmin){
                setCookie('isAdmin', admin, {path: '/', expires, sameSite: 'None', secure: true })
                navigate("/admin")
            }
       
            
            else{
                if(response.status) { 
                    window.localStorage.setItem("token" , accessToken)
                    window.localStorage.setItem("loggedIn" , true)
                    window.localStorage.setItem("username",name)
                    window.localStorage.setItem("userID", userid)
                    
                    setCookie('accessToken', accessToken, { path: '/',  expires, sameSite: 'None' ,secure: true })
                    setCookie('refreshToken', refreshToken, {path: '/', expires, sameSite: 'None', secure: true })
                    
    
                }
                if(response.data.data.isNewUser){
                    navigate('/select');
                }
            }

        }
        catch(error){
            console.log("login failed in login.jsx" , error);
            setIsLoading(false);
        }
    }

 

  return (
    <div className='middle'>
       
       {isLoading ? (
                <LoadingSpinner />
            ) : (
       
        <form action=""  onSubmit={handleSubmit}>
        <h2 >Login</h2>
            <div className='field' > 
                <label htmlFor="email" className='label'>Email</label> <br />
                <input type="email" className={`input ${emailError ? 'error' : ''}`} name='email'
                value={userlogin.email}
                onChange={handleInput} id='email'/>
                   {emailError && <span className="error-message">Please enter your email</span>}
            </div>

            <div className='field'>
                <label htmlFor="password" className='label'>Password</label> <br />
                <input type="Password" className={`input ${passwordError ? 'error' : ''}`} name='password'
                onChange={handleInput} value={userlogin.password} id='password'/>
                  {passwordError && <span className="error-message">Please enter your password</span>}
            </div>

            <div>
                <button className="Llogin" type='submit' >Login</button>
            </div>


            <div className="register">
            <h3>Dont have an Account ? </h3>  <Link className='a' to="/Register" >Register</Link>

            </div>
            
        </form>

            )}

    </div>
  )
}

export default Login;