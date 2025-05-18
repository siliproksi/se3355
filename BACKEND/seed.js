const fs = require('fs');
const db = require('./db');

const clearTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM quick_links', (err) => {
        if (err) console.error('Error clearing quick_links table:', err);
      });
      
      db.run('DELETE FROM slider', (err) => {
        if (err) console.error('Error clearing slider table:', err);
      });
      
      db.run('DELETE FROM electronics', (err) => {
        if (err) console.error('Error clearing electronics table:', err);
      });
      
      db.run('DELETE FROM products', (err) => {
        if (err) console.error('Error clearing products table:', err);
        resolve();
      });
    });
  });
};

const seedQuickLinks = () => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(fs.readFileSync('./QuickLinks.json', 'utf-8'));
      
      db.serialize(() => {
        const stmt = db.prepare("INSERT INTO quick_links (forwardLink) VALUES (?)");
        
        data.forEach(item => {
          stmt.run(item.forwardLink);
        });
        
        stmt.finalize();
        console.log("Quick links data loaded successfully.");
        resolve();
      });
    } catch (error) {
      console.error("Error loading quick links data:", error);
      reject(error);
    }
  });
};

const seedSlider = () => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(fs.readFileSync('./Slider.json', 'utf-8'));
      
      db.serialize(() => {
        const stmt = db.prepare("INSERT INTO slider (image, forwardLink) VALUES (?, ?)");
        
        data.forEach(item => {
          stmt.run(item.image, item.forwardLink);
        });
        
        stmt.finalize();
        console.log("Slider data loaded successfully.");
        resolve();
      });
    } catch (error) {
      console.error("Error loading slider data:", error);
      reject(error);
    }
  });
};

const seedElectronics = () => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(fs.readFileSync('./electronic.json', 'utf-8'));
      
      db.serialize(() => {
        const stmt = db.prepare(`INSERT INTO electronics (img, title, discountedPrice, forwardLink)
          VALUES (?, ?, ?, ?)`);
        
        data.forEach(item => {
          stmt.run(item.img, item.title, item.discountedPrice, item.forwardLink);
        });
        
        stmt.finalize();
        console.log("Electronics data loaded successfully.");
        resolve();
      });
    } catch (error) {
      console.error("Error loading electronics data:", error);
      reject(error);
    }
  });
};

const seedProducts = () => {
  return new Promise((resolve, reject) => {
    try {
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
        console.log("Products data loaded successfully.");
        resolve();
      });
    } catch (error) {
      console.error("Error loading products data:", error);
      reject(error);
    }
  });
};

const seedAll = async () => {
  console.log("Starting database seeding process...");
  
  try {
    await clearTables();
    console.log("Tables cleared successfully.");
    
    await seedQuickLinks();
    await seedSlider();
    await seedElectronics();
    await seedProducts();
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding process:", error);
  } finally {
  }
};

seedAll();