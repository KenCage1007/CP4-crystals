import React, { useEffect, useState } from "react";
import "../styles/cart.css";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [activeSection, setActiveSection] = useState("cart");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart.map((item) => ({ ...item, quantity: 1 }))); // Default quantity is 1
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  const handleCheckout = () => {
    setShowConfirmPopup(true);
  };

  const confirmCheckout = () => {
    setShowConfirmPopup(false);
    setShowSuccessPopup(true);

    // Clear the cart after checkout
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="cart-page">
      <div className="toggle-header">
        <span
          className={`toggle-link ${activeSection === "cart" ? "active" : "inactive"}`}
          onClick={() => handleSectionChange("cart")}
        >
          Cart
        </span>
        <span
          className={`toggle-link ${activeSection === "saved" ? "active" : "inactive"}`}
          onClick={() => handleSectionChange("saved")}
        >
          Saved for Later
        </span>
        <span
          className={`toggle-link ${activeSection === "favorites" ? "active" : "inactive"}`}
          onClick={() => handleSectionChange("favorites")}
        >
          Favorites
        </span>
      </div>

      {/* Cart Section */}
      {activeSection === "cart" && (
        <div className="cart-items">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <label htmlFor={`quantity-${item.id}`} className="quantity-label">
                      Quantity:
                    </label>
                    <select
                      id={`quantity-${item.id}`}
                      className="quantity-dropdown"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="remove-item-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <p className="total-amount">Total: ${calculateTotal()}</p>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </>
          ) : (
            <div className="empty-cart">
              <h1>Your cart is empty</h1>
              <p>Check out what we're featuring now!</p>
              <button
                className="home-button"
                onClick={() => (window.location.href = "/")}
              >
                Go to homepage
              </button>
            </div>
          )}
        </div>
      )}

      {/* Saved for Later Section */}
      {activeSection === "saved" && (
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
      {activeSection === "favorites" && (
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

      {/* Confirm Checkout Popup */}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Confirm you want to pay ${calculateTotal()}?</p>
            <button className="confirm-button" onClick={confirmCheckout}>
              Yes
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowConfirmPopup(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Your items are being prepared for delivery. Happy wishing!</p>
            <button
              className="close-button"
              onClick={() => setShowSuccessPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
