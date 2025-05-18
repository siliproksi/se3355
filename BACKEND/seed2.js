const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./electronic.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare(`INSERT INTO electronics (img, title, discountedPrice, forwardLink)
    VALUES (?, ?, ?, ?)`);

  data.forEach(item => {
    stmt.run(item.img, item.title, item.discountedPrice, item.forwardLink);
  });

  stmt.finalize();
  console.log('Elektronik verisi yüklendi.');
});
