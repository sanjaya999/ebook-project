import React, { useContext } from 'react'
import "./UserProfile.css"
import UserContext from '../../Context/Context';

function UserProfile() {
    const {user} = useContext(UserContext);

  return (
    <div>
        <h2>My Profile</h2>

    <div className="userhead">
        <div className="showname">
            {user}
        </div>

    </div>


    </div>
  )
}

export default UserProfile;