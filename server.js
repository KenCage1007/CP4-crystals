import cors from 'cors';
import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 5002; // Ensure this port is not already in use

app.use(cors());
app.use(express.json());

// Database initialization
let db; // Declare `db` only once
(async () => {
  try {
    db = await open({
      filename: './OasisWishes.db', // Path to your database file
      driver: sqlite3.Database,
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
})();

// API endpoint to get products
// API endpoint to get products
app.get('/api/products', async (req, res) => {
    try {
      const products = await db.all('SELECT * FROM products');
      console.log('Products fetched from database:', products); // Debug log
      res.json(
        products.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price), // Ensure price is a number
          imageUrl: product.image_url, // Correct mapping from database
        }))
      );

    } catch (err) {
      console.error('Error retrieving products:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
