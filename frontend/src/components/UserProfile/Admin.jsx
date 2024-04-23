import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

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

        const booksResponse = await axios.get(
          "http://localhost:5000/api/v1/user/adminBooks",
          config
        );
        console.log("this is from admin books  :", booksResponse.data.data);
        setBooks(booksResponse.data.data);

        const userResponse = await axios.get(
          "http://localhost:5000/api/v1/user/adminUsers",
          config
        );
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

      await axios.delete(
        `http://localhost:5000/api/v1/user/adminDeleteUser`,
        config
      );
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

      await axios.delete(
        `http://localhost:5000/api/v1/user/adminDeleteBook`,
        config
      );
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
      await axios.put(
        `http://localhost:5000/api/v1/user/adminApproveBook`,
        body,
        config
      );

      setBooks(
        books.map((book) =>
          book._id === bookId ? { ...book, approved: isApproved } : book
        )
      ); // Update books array
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
      await axios.put(
        `http://localhost:5000/api/v1/user/approveUser`,
        body,
        config
      );

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isApproved } : user
        )
      );
    } catch (error) {
      console.error("Error approving/disapproving user:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="users-section">
        <h2 className="section-title">Users</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <span className="user-name">
                {user.name} ({user.email})
              </span>
              <span
                className={`approval-status ${
                  user.isApproved ? "approved" : "not-approved"
                }`}
              >
                {user.isApproved ? "Approved" : "Not Approved"}
              </span>
              <button
                className="approval-button"
                onClick={() => approved(user._id, true)}
              >
                Approve
              </button>
              <button
                className="disapproval-button"
                onClick={() => approved(user._id, false)}
              >
                Disapprove
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="books-section">
        <h2 className="section-title">Books</h2>
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <span className="book-title">
                {book.bookName}
              </span>
              <span
                className={`approval-status ${
                  book.approved ? "approved" : "not-approved"
                }`}
              >
                {book.approved ? "Approved" : "Not Approved"}
              </span>
              <button
                className="approval-button"
                onClick={() => approveBook(book._id, true)}
              >
                Approve
              </button>
              <button
                className="disapproval-button"
                onClick={() => approveBook(book._id, false)}
              >
                Disapprove
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteBook(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
