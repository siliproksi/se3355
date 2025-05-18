const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.db');

db.run(`CREATE TABLE IF NOT EXISTS quick_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    forwardLink TEXT
  )`);

db.run(`CREATE TABLE IF NOT EXISTS slider (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT,
  forwardLink TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS electronics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  img TEXT,
  title TEXT,
  discountedPrice TEXT,
  forwardLink TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  img TEXT,
  title TEXT,
  discountedPrice TEXT,
  rating REAL,
  votes INTEGER,
  forwardLink TEXT
)`);

module.exports = db;
