import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInMenuOpen, setSignInMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, updateUser } = useContext(UserContext); // Access user context
  const [hoveredSection, setHoveredSection] = useState(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSignInMenuOpen(false);
  };

  const toggleSignInMenu = () => {
    setSignInMenuOpen(!signInMenuOpen);
    setMenuOpen(false);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setSignInMenuOpen(false);
  };

  const handleSignOut = () => {
    updateUser(null);
    setSignInMenuOpen(false);
    navigate('/');
  };

  const goToFavorites = () => {
    if (user) {
      navigate('/favorites'); // Navigate to Favorites if user is logged in
    } else {
      alert('Please sign in to view your favorites.'); // Alert if not logged in
    }
  };

  return (
    <>
      <header className="header">
        <div className="left-section">
          <Link to="/" className="logo">
            <div className="ballet-shop-name">Oasis Wishes</div>
          </Link>
          <img
            src="/pop-out.svg"
            alt="Menu"
            className="menu-icon"
            onClick={toggleMenu}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search-input"
            placeholder="Find what you wish"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <img src="/magnifier-icon.svg" alt="Search" className="magnifier-icon" />
          </button>
        </form>

        <div className="right-section">
          {user ? (
            <div className="sign-in-container" onClick={toggleSignInMenu}>
              <img
                src="/person-icon.svg"
                alt="Person Icon"
                className="person-icon"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="sign-in-text sign-in-bold">Hi, {user.firstName}</span>
            </div>
          ) : (
            <div className="sign-in-container" onClick={toggleSignInMenu}>
              <img
                src="/person-icon.svg"
                alt="Person Icon"
                className="person-icon"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="sign-in-text">Sign In</span>
            </div>
          )}
          <button className="basket-button">
            <Link to="/cart">
              <img src="/basket.svg" alt="Basket" className="basket-icon" />
            </Link>
          </button>
        </div>
      </header>

      {/* Left-Side Menu */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu">
          <h2>Categories</h2>
          <div className="menu-row" onClick={() => navigate('/crystals')}>
            <span className="menu-action">Crystals</span>
          </div>
          <div className="menu-divider"></div>
          <div className="menu-row" onClick={() => navigate('/aromas')}>
            <span className="menu-action">Aromas</span>
          </div>
          <div className="menu-divider"></div>
          <div className="menu-row" onClick={() => navigate('/home-goods')}>
            <span className="menu-action">Home Goods</span>
          </div>
          <div className="menu-divider"></div>
          <div className="menu-row" onClick={() => navigate('/jewelry')}>
            <span className="menu-action">Jewelry</span>
          </div>
          <div className="menu-divider"></div>
          <div className="menu-row" onClick={() => navigate('/apparel')}>
            <span className="menu-action">Apparel</span>
          </div>
        </div>
      </div>

      {/* Right-Side Menu */}
      <div className={`sign-in-menu-overlay ${signInMenuOpen ? 'open' : ''}`}>
        {user ? (
          <div className="sign-in-menu logged-in-menu">
            <p className="menu-header">Hi, {user.firstName}</p>
            <div className="menu-row" onClick={() => navigate('/account-settings')}>
              <span className="menu-action">My Oasis</span>
              <span className="menu-action-light">Manage account</span>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-row" onClick={() => navigate('/purchase-history')}>
              <span className="menu-action">Purchase history</span>
              <span className="menu-action-light">Track + manage</span>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-row" onClick={goToFavorites}>
              <span className="menu-action">Favorites</span>
            </div>
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="sign-in-menu">
            <p>
              Sign in for your purchase history, Oasis Wishes deals, store
              information, and much more.
            </p>
            <button
              className="sign-in-button"
              onClick={() => {
                setSignInMenuOpen(false);
                navigate('/signin');
              }}
            >
              Sign In
            </button>
            <button
              className="create-account-button"
              onClick={() => {
                setSignInMenuOpen(false);
                navigate('/create-account');
              }}
            >
              Create Account
            </button>
          </div>
        )}
      </div>

      {/* Background Overlay */}
      {(menuOpen || signInMenuOpen) && (
        <div className="overlay open" onClick={closeMenus}></div>
      )}
    </>
  );
};

export default Header;
