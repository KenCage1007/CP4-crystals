import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./ProductCatalog.css";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const { user } = useContext(UserContext); // Access the current user
  const navigate = useNavigate();

  // Load favorites from local storage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePopup = (message, redirect = false) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage(null);
      if (redirect) {
        navigate("/signin"); // Redirect to the login page
      }
    }, 3000);
  };

  const toggleFavorite = (productId, productName) => {
    if (!user) {
      handlePopup("You must log in first", true);
      return;
    }
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId) // Remove from favorites
        : [...prevFavorites, productId] // Add to favorites
    );

    handlePopup(
      favorites.includes(productId)
        ? `${productName} removed from favorites`
        : `${productName} added to favorites`
    );
  };

  const addToCart = (product) => {
    if (!user) {
      handlePopup("You must log in first", true);
      return;
    }
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      handlePopup(`${product.name} is already in your cart`);
    } else {
      const updatedCart = [...storedCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      handlePopup(`${product.name} added to cart`);
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-catalog">
      <h2>Our Products</h2>

      {/* Popup Message */}
      {popupMessage && <div className="popup-message">{popupMessage}</div>}

      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Favorite Icon */}
              <div
                className={`heart-icon ${
                  favorites.includes(product.id) ? "favorite" : ""
                }`}
                onClick={() => toggleFavorite(product.id, product.name)}
              >
                ❤️
              </div>
              {/* Product Details */}
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => (e.target.style.display = "none")}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
              {/* Add to Cart Button */}
              <div
                className="basket-icon"
                onClick={() => addToCart(product)}
                role="button"
              >
                🛒
              </div>
            </div>
          ))
        ) : (
          <div className="no-products-message">
            No products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
