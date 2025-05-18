const fs = require('fs');
const db = require('./db');

const data = JSON.parse(fs.readFileSync('./QuickLinks.json', 'utf-8'));

db.serialize(() => {
  const stmt = db.prepare("INSERT INTO quick_links (forwardLink) VALUES (?)");

  data.forEach(item => {
    stmt.run(item.forwardLink);
  });

  stmt.finalize();
  console.log("Veri başarıyla yüklendi.");
});
