import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [showServices, setShowServices] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
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
            <ul className="dropdown">
              <li><Link to="/login">Point of Sale</Link></li>
              <li><a href="/audit">Audit Services</a></li>
              <li><a href="/etr">ETR Services</a></li>
            </ul>
          )}
        </li>
        <li><Link to="/about">About</Link></li>

        {currentUser ? (
          <>
            <li><span style={{ color: 'white' }}>Hello, {currentUser.email}</span></li>
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
