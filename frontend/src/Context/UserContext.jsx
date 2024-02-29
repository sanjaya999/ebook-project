import React, { useEffect, useState } from 'react'
import UserContext from './Context.js'

const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{

            try{
                const response = await axios.get('http://localhost:5000/api/v1/user/login');
                setUser(response.data.user);

            }
            catch(error){
                console.log("fetch user error : ", error)
            }
        }
        fetchData();
    }, []);

    const login = async (Credentials)=>{
        try{
            const response = await axios.post('http://localhost:5000/api/v1/user/login' , Credentials);
            setUser(response.data.user);
        }
        catch(error){
            console.log("loginerror" , error)
        }
    }


    const logout = async()=>{
        try{
            await axios.post('http://localhost:5000/api/v1/user/logOut');
            setUser(null);
        }
        catch(error){
            console.log("Logout error" , error)
        }
    }

    return (
        <UserContext.Provider value={{ user , login , logout}}>

            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider