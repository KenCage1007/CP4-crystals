import axios from "axios";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import "./ProductCatalog.css";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/products");
        setProducts(response.data);
        console.log("Products fetched:", response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = async (productId, productName) => {
    const isFavorite = favorites.includes(productId);

    try {
      if (isFavorite) {
        await deleteDoc(doc(db, "favorites", productId.toString()));
      } else {
        const favoriteProduct = products.find((p) => p.id === productId);
        await setDoc(doc(db, "favorites", productId.toString()), favoriteProduct);
      }

      setFavorites((prevFavorites) =>
        isFavorite
          ? prevFavorites.filter((id) => id !== productId)
          : [...prevFavorites, productId]
      );

      setPopupMessage(
        isFavorite
          ? `${productName} removed from favorites`
          : `${productName} added to favorites`
      );

      setTimeout(() => setPopupMessage(null), 3000);
    } catch (err) {
      console.error("Error updating favorites:", err);
      setPopupMessage("Failed to update favorites. Please try again.");
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-catalog">
      <h2>Our Products</h2>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className={`heart-icon ${
                  favorites.includes(product.id) ? "favorite" : ""
                }`}
                onClick={() => toggleFavorite(product.id, product.name)}
              >
                ❤️
              </div>
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => (e.target.style.display = "none")}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <div className="no-products-message">No products available at the moment.</div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
