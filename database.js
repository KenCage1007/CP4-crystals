import sqlite3 from 'sqlite3';

// Enable verbose mode for SQLite debugging
sqlite3.verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database('./OasisWishes.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Export the database connection for use in other files
export default db;
