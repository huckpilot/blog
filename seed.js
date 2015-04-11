var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blog.db');
db.run("INSERT INTO blog (title, body, image) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)",
  'Title1', 'body1','url1',
  'Title2', 'body2','url2',
  'Title3', 'body3','url3',
  'Title4', 'body4','url4',
  function(err) {
    if (err) {
      throw err;
    }
  }
};
