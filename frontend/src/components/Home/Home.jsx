import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
import book from "../book.png"
import axios from 'axios';
import LoadingSpinner from '../Loading/LoadingSpinner';


function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/v1/user/search?searchTerm=${searchTerm}`);
      setBooks(response.data.data);
      console.log(response.data.data)
      setIsLoading(false);

    } catch (err) {
      console.error(err);
    }

  }




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
    <input type="text" className='searchbook'  
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
    placeholder='Search For any books , articles , papers' />
    <button  onClick={handleSearch} className='SButton'>Search</button>



    {isLoading ? (
        <LoadingSpinner />
      ) : ( <>
    {Array.isArray(books) && books.length > 0 ? (
  <ul className="book-list">
    {books.map((book) => (
      <li key={book._id} className="book-item">
        <div className="book-image-container">
          <img className="book-image" src={book.bookImage} alt={book.bookName} />
        </div>
        <div className="book-details">
          <h3 className="book-title">{book.bookName}</h3>
          <a className="book-download" href={book.bookFile} download>
            Download Book
          </a>
        </div>
      </li>
    ))}
  </ul>
) : (
  <p>No books found</p>
)}</>)}


   </div>


   <div className="section">
    <Link to="/top" className='Top100'>Top 100</Link>
    <div className="request">Request Book</div>
 
   </div>
   </>
  )
}

export default Home;