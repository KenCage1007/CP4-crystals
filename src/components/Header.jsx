import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInMenuOpen, setSignInMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, updateUser } = useContext(UserContext);
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

  return (
    <>
      <header className="header">
        {/* Decorative Vines Image */}
        <div className="deco-vines-container">
          <img
            src="/Deco-vines.png"
            alt="Decorative Vines"
            className="deco-vines"
          />
        </div>

        <div className="header-content">
          <div className="left-section">
            <Link to="/" className="logo">
              <div className="ballet-shop-name">Oasis Wishes</div>
            </Link>
            <img
              src="/pop-out.svg"
              alt="Menu"
              className="menu-icon"
              onClick={toggleMenu}
              style={{ filter: 'brightness(0) invert(1)' }} // Set the icon color to white
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
                  style={{ filter: 'brightness(0) invert(1)' }} // Set the icon color to white
                />
                <span className="sign-in-text sign-in-bold">Hi, {user.firstName}</span>
              </div>
            ) : (
              <div className="sign-in-container" onClick={toggleSignInMenu}>
                <img
                  src="/person-icon.svg"
                  alt="Person Icon"
                  className="person-icon"
                  style={{ filter: 'brightness(0) invert(1)' }} // Set the icon color to white
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
        </div>
      </header>

      {/* Left-Side Menu */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="menu">
          <h2>Categories</h2>
          {/* Crystals */}
          <div
            className="menu-row"
            onClick={() => {
              closeMenus();
              navigate('/crystals');
            }}
          >
            <span className="menu-action">Crystals</span>
          </div>
          <div className="menu-divider"></div>

          {/* Aromas */}
          <div
            className="menu-row"
            onClick={() => {
              closeMenus();
              navigate('/aromas');
            }}
          >
            <span className="menu-action">Aromas</span>
          </div>
          <div className="menu-divider"></div>

          {/* Home Goods */}
          <div
            className="menu-row"
            onClick={() => {
              closeMenus();
              navigate('/home-goods');
            }}
          >
            <span className="menu-action">Home Goods</span>
          </div>
          <div className="menu-divider"></div>

          {/* Jewelry */}
          <div
            className="menu-row"
            onClick={() => {
              closeMenus();
              navigate('/jewelry');
            }}
          >
            <span className="menu-action">Jewelry</span>
          </div>
          <div className="menu-divider"></div>

          {/* Apparel */}
          <div
            className="menu-row"
            onClick={() => {
              closeMenus();
              navigate('/apparel');
            }}
          >
            <span className="menu-action">Apparel</span>
          </div>
        </div>
      </div>

      {/* Right-Side Menu */}
      <div className={`sign-in-menu-overlay ${signInMenuOpen ? 'open' : ''}`}>
        {user ? (
          <div className="sign-in-menu logged-in-menu">
            <p className="menu-header">Hi, {user.firstName}</p>

            {/* Section 1: My Oasis / Manage Account */}
            <div
              className={`menu-row ${hoveredSection === 'account-settings' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSection('account-settings')}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => {
                closeMenus();
                navigate('/account-settings');
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="menu-action-left">
                <img src="/person-circle-icon.svg" alt="My Oasis" className="menu-icon" />
                <span className="menu-action">My Oasis</span>
              </div>
              <span className="menu-action-right">Manage account</span>
            </div>
            <div className="menu-divider"></div>

            {/* Section 2: Purchase History / Track + Manage */}
            <div
              className={`menu-row ${hoveredSection === 'purchase-history' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSection('purchase-history')}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => {
                closeMenus();
                navigate('/purchase-history');
              }}
              style={{ cursor: 'pointer' }}
            >
              <span className="menu-action">Purchase history</span>
              <span className="menu-action-right">Track + manage</span>
            </div>
            <div className="menu-divider"></div>

            {/* Section 3: Favorites */}
            <div
              className={`menu-row ${hoveredSection === 'favorites' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSection('favorites')}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => {
                closeMenus();
                navigate('/favorites');
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="menu-action-left">
                <img src="/heart-icon.svg" alt="Favorites" className="menu-icon" />
                <span className="menu-action">Favorites</span>
              </div>
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
        <div
          className="overlay open"
          onClick={closeMenus}
        ></div>
      )}
    </>
  );
};

export default Header;
