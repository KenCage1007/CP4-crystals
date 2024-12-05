import React, { useState } from 'react';
import '../styles/cart.css';

const Cart = ({ user }) => {
  const [activeSection, setActiveSection] = useState('saved');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="cart-page">
      <div className="empty-cart">
        <h1>Your cart is empty</h1>
        <p>Check out what we're featuring now!</p>
        <button
          className="home-button"
          onClick={() => window.location.href = '/'}
        >
          Go to homepage
        </button>
      </div>

      {/* Section Toggle Header */}
      <div className="toggle-header">
        <span
          className={`toggle-link ${activeSection === 'saved' ? 'active' : 'inactive'}`}
          onClick={() => handleSectionChange('saved')}
        >
          Saved for Later
        </span>
        <span
          className={`toggle-link ${activeSection === 'favorites' ? 'active' : 'inactive'}`}
          onClick={() => handleSectionChange('favorites')}
        >
          Favorites
        </span>
      </div>

      {/* Saved for Later Section */}
      {activeSection === 'saved' && (
        <div className="saved-for-later">
          <div className="saved-empty">
            <img
              src="/clock-icon.svg"
              alt="Saved for Later"
              className="saved-icon"
            />
            <h2 className="saved-title">Save your items for later</h2>
            <p className="saved-description">
              If you aren't ready to buy, select Save for later. We'll keep the item safe here.
            </p>
          </div>
        </div>
      )}

      {/* Favorites Section */}
      {activeSection === 'favorites' && (
        <div className="favorites">
          <div className="favorites-empty">
            <img
              src="/heart-icon.svg"
              alt="Favorites"
              className="favorites-icon"
            />
            <h2 className="favorites-title">Track your favorite items</h2>
            <p className="favorites-description">
              While browsing, select the heart icon on your favorite items to keep tabs on availability and new sale prices.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
