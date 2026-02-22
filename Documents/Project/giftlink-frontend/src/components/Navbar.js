import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check login status on component mount and after navigation
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Listen for localStorage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also check on focus in case login happened in another component
    window.addEventListener('focus', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkLoginStatus);
    };
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');
    
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  const handleLogout = () => {
    // Clear all auth data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    setIsLoggedIn(false);
    setUserName('');
    
    // Navigate to home page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">GiftLink</Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          
          {isLoggedIn ? (
            <>
              <li className="nav-user">Hello, {userName}</li>
              <li>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
