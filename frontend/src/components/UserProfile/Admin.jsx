import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const genres = ["Fiction", "Non-Fiction", "Romance", "Mystery", "Thriller", "Spritual", "Science and Technology"];

function Admin() {
  const token = window.localStorage.getItem("token");
  const _id = window.localStorage.getItem("userID");

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const booksResponse = await axios.get("http://localhost:5000/api/v1/user/adminBooks", config);
        console.log("this is from admin books  :", booksResponse.data.data);
        setBooks(booksResponse.data.data);

        const userResponse = await axios.get("http://localhost:5000/api/v1/user/adminUsers", config);
        console.log("this is admin users : ", userResponse.data.data);
        setUsers(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId,
        },
      };

      await axios.delete(`http://localhost:5000/api/v1/user/adminDeleteUser`, config);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          bookId,
        },
      };

      await axios.delete(`http://localhost:5000/api/v1/user/adminDeleteBook`, config);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const approveBook = async (bookId, isApproved) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          bookId,
        },
      };
      const body = { isApproved };
      await axios.put(`http://localhost:5000/api/v1/user/adminApproveBook`, body, config);

      setBooks(books.map((book) => (book._id === bookId ? { ...book, approved: isApproved } : book)));
    } catch (error) {
      console.error("Error approving book:", error);
    }
  };

  const approved = async (userId, isApproved) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        params: {
          userId,
        },
      };
      const body = { isApproved };
      await axios.put(`http://localhost:5000/api/v1/user/approveUser`, body, config);

      setUsers(users.map((user) => (user._id === userId ? { ...user, isApproved } : user)));
    } catch (error) {
      console.error("Error approving/disapproving user:", error);
    }
  };

  const groupBooksByGenre = () => {
    const booksByGenre = genres.reduce((acc, genre) => {
      const booksInGenre = books.filter((book) => book.genre === genre);
      acc[genre] = booksInGenre;
      return acc;
    }, {});
    return booksByGenre;
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="users-section">
        <h2 className="section-title">Users ({users.length})</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`approval-status ${user.isApproved ? "approved" : "not-approved"}`}>
                    {user.isApproved ? "Approved" : "Not Approved"}
                  </span>
                </td>
                <td>
                  <button className="approval-button" onClick={() => approved(user._id, true)}>
                    Approve
                  </button>
                  <button className="disapproval-button" onClick={() => approved(user._id, false)}>
                    Disapprove
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="books-section">
        <h2 className="section-title">Books ({books.length})</h2>
        {genres.map((genre) => (
          <div key={genre} className="genre-section">
            <h3 className="genre-title">{genre} ({groupBooksByGenre()[genre].length})</h3>
            <table className="book-table">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Genre</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupBooksByGenre()[genre].map((book) => (
                  <tr key={book._id}>
                    <td>{book.bookName}</td>
                    <td>{book.genre}</td>
                    <td>
                      <span className={`approval-status ${book.approved ? "approved" : "not-approved"}`}>
                        {book.approved ? "Approved" : "Not Approved"}
                      </span>
                    </td>
                    <td>
                      <button className="approval-button" onClick={() => approveBook(book._id, true)}>
                        Approve
                      </button>
                      <button className="disapproval-button" onClick={() => approveBook(book._id, false)}>
                        Disapprove
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteBook(book._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;