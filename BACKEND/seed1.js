// seed-slider.js
const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./Slider.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare("INSERT INTO slider (image, forwardLink) VALUES (?, ?)");

  data.forEach(item => {
    stmt.run(item.image, item.forwardLink);
  });

  stmt.finalize();
  console.log("Main slider verisi yüklendi.");
});
