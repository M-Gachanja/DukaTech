import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const [showServices, setShowServices] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <h2><b>DukaTech</b></h2>

        <li><Link to="/">Home</Link></li>

        <li
          className="services-menu"
          onMouseEnter={() => setShowServices(true)}
          onMouseLeave={() => setShowServices(false)}
        >
          <span>Services ▾</span>
          {showServices && (
            <ul className="dropdown_nav">
              <li><a href="/#audit">Audit Services</a></li>
              <li><a href="/#etr">ETR Services</a></li>
            </ul>
          )}
        </li>

        <li><a href="/#about">About</a></li>

        {currentUser ? (
          <>
            <li>
              <Link to="/profile" className="user-icon-link">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="profile-img"
                  />
                ) : (
                  <FaUserCircle className="fallback-icon" />
                )}
              </Link>
            </li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
