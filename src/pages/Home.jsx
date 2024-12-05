import React from 'react';
import ProductCatalog from '../components/ProductCatalog';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Oasis Wishes</h1>
      <ProductCatalog /> {/* Render ProductCatalog here */}
    </div>
  );
};

export default Home;
