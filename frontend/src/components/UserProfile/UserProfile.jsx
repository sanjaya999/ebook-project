import { useState, useEffect } from "react";
import React from "react";
import "./UserProfile.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

function UserProfile() {
  const token = window.localStorage.getItem("token");
  const _id = window.localStorage.getItem("userID");
  const [userData, setUserData] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { _id };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { _id },
        };
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/userId",
          config,
          data
        );
        console.log("this is from userprofile :", response.data);
        const { fullName, email, createdAt, profile, _id: userId } =
          response.data.data.user;
        setUserData({ fullName, email, createdAt, profile, userId });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, _id]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/changePassword",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const userId = window.localStorage.getItem("userID");

        const response = await axios.post(
          `http://localhost:5000/api/v1/user/getbookmarks`,
          { userId },
          config
        );

        const fetchedBookmarks = response.data.data.bookmarks;
        setBookmarks(fetchedBookmarks);
        const fetchedBookmarkIds = fetchedBookmarks.map(bookmark => bookmark._id);
        setBookmarkedIds(fetchedBookmarkIds);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, [token]);

  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };

  const handleBookClick = (bookFile) => {
    window.open(bookFile, '_blank');
  };

  const handleBookmarkClick = async (bookId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const isBookmarked = bookmarkedIds.includes(bookId);
      const response = await axios({
        method: isBookmarked ? 'DELETE' : 'POST',
        url: `http://localhost:5000/api/v1/user/bookmarks/${bookId}`,
        headers: config.headers,
      });

      if (response.status === 200) {
        if (isBookmarked) {
          setBookmarkedIds(bookmarkedIds.filter(id => id !== bookId));
        } else {
          setBookmarkedIds([...bookmarkedIds, bookId]);
        }
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <div className="userDetail">
        <div className="userImageContainer">
          <img className="userImage" src={userData.profile} alt="Profile" />
        </div>
        <div className="otherDetail">
          <div className="fullName">Name : {userData.fullName}</div>
          <div className="email"> User Email : {userData.email}</div>
          <div className="createdAt">
            Account Created At :{userData.createdAt}
          </div>
          <div className="userId"> User ID : {userData.userId}</div>
        </div>
      </div>
      <div className="upload">
        <NavLink to="/upload">Upload your own ?</NavLink>
      </div>
      <div className="changePassword">
        <button onClick={() => setShowChangePassword(!showChangePassword)}>
          Change Password
        </button>
        {showChangePassword && (
          <div>
            <form onSubmit={handleChangePassword}>
              {message && <p>{message}</p>}
              <div>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Change Password</button>
            </form>
          </div>
        )}
      </div>
      <div className="card user-profile-bookmarks">
        <button onClick={toggleBookmarks}>
          {showBookmarks ? 'Hide Bookmarks' : 'Show Bookmarks'}
        </button>
        {showBookmarks && (
          <div>
            <h2>Bookmarked Books</h2>
            {bookmarks.length === 0 ? (
              <p>You don't have any bookmarks yet.</p>
            ) : (
              <ul className="user-profile-book-list">
                {bookmarks.map(book => (
                  <li key={book._id}>
                    <h2>{book.bookName}</h2>
                    <img src={book.bookImage} alt="" srcSet="" />
                    <button
                      className={bookmarkedIds.includes(book._id) ? 'bookmarked' : ''}
                      onClick={() => handleBookmarkClick(book._id)}
                    >
                      {bookmarkedIds.includes(book._id) ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button
                      className="app-explore-book-download-btn"
                      onClick={() => handleBookClick(book.bookFile)}
                    >
                      Read Book
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;