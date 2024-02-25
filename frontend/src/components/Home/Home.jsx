import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import book from "../book.png"

function Home() {
  return (
   <>
   <div className="logo"><img className="image"  src={book} alt="" srcset="" /></div>
   

   <div className="we">
    <p className='aboutus'> 
    We are world leading book room 
    </p>
   </div>

   <div className="homelog">
    <p className="sign">
      <Link className="log" to="/Login">Login!</Link> to join us and show your writing!
    </p>
   </div>



   <div className="search">
    <input type="text" className='searchbook'  placeholder='Search For any books , articles , papers' />
    <button className='SButton'>Search</button>

   </div>
   </>
  )
}

export default Home;