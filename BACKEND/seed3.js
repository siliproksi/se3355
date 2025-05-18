const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare(`INSERT INTO products (img, title, discountedPrice, rating, votes, forwardLink)
    VALUES (?, ?, ?, ?, ?, ?)`);

  data.forEach(item => {
    stmt.run(
      item.img,
      item.title,
      item.discountedPrice || null,
      item.rating,
      item.votes,
      item.forwardLink
    );
  });

  stmt.finalize();
  console.log('Veri yüklendi.');
});
