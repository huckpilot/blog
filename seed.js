var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blog.db');
db.run("INSERT INTO posts (title, paragraph, image) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)",
  'Title1', 'paragraph1', 'image1',
  'Title2', 'paragraph2', 'image2',
  'Title3', 'paragraph3', 'image3',
  'Title4', 'paragraph4', 'image4',
  function(err) {
    if (err) {
      throw err;
    }
  }
);