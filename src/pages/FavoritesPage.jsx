import React, { useEffect, useState } from "react";
import "../styles/FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    // Fetch all products to filter favorites
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/products");
        const data = await response.json();
        setProducts(data.filter((product) => storedFavorites.includes(product.id)));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      <div className="favorites-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="favorite-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => (e.target.style.display = "none")}
                className="favorite-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <div className="no-favorites-message">You have no favorites yet.</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
