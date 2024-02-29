import React, { useEffect, useState } from 'react'
import UserContext from './Context.js'
import axios from 'axios';



const UserContextProvider = ({children})=>{
    const [user, setUser] = useState(null);


    return (
        <UserContext.Provider value={{ user , setUser}}>

            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider