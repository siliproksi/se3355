const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Merhaba Express!');
});

app.get('/api/quick-links', (req, res) => {
  db.all('SELECT * FROM quick_links', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/slider', (_, res) => {
  db.all('SELECT * FROM slider', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/electronics-slider', (_, res) => {
  db.all('SELECT * FROM electronics', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/products', (_, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`API calisiyor: http://localhost:${port}`);
});
