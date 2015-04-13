//This is my blog app

////////////////////////
//Admin stuff
////////////////////////


// Get access to the sqlite3 module
var sqlite3 = require("sqlite3");

// Specify which file is the database
var db = new sqlite3.Database("blog.db");

// Add request for accessing api
var request = require("request");

// This allows me to create the app
var express = require("express");
var app = express();

// Var ejs sets the templating engine
var ejs = require("ejs");
app.set("view_engine", "ejs");

// Use body parser to parse the body
var bodyParser = require("body-parser");
// Tell app which method to use when parsing
app.use(bodyParser.urlencoded({
  extended: false
}))

// Allow for method override
var methodOverride = require("method-override");
// tell app which override method to use
app.use(methodOverride("_method"))

// giphy api section
//first part of the api search before the search term
var apiStart = "http://api.giphy.com/v1/gifs/search?q=";
var apiEnd = "&api_key=dc6zaTOxFJmzC";

////////////////////////
//Fun stuff 
////////////////////////

// This will redirect to my blog if someone does not specify a route.
app.get("/", function(req, res) {
  res.redirect("/posts")
});

// This is going to show all blog posts
app.get("/posts", function(req, res) {
  db.all("SELECT * FROM posts", function(err, data) {
    //console.log(data);
    res.render("index.ejs", {
      posts: data
    })
  });
});

// Show individual post
app.get("/post/:id", function(req, res) {
  // Get blog id from url,  set thisPost to appropriate post
  db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err, data) {
    //console.log(data)
    res.render("show.ejs", {
      thisPost: data
    })
  });
});

// Serve up a new page for a create post form
app.get("/posts/new", function(req, res) {
  res.render("new.ejs")
});


// Create the post and post it to your posts page
app.post("/posts", function(req, res) {
  var giphy = apiStart + req.body.image + apiEnd;
  request(giphy, function(err, response, body) {
    //console.log(body);
    var bodyParse = JSON.parse(body);
    //console.log(bodyParse);
    var giphyUrl = bodyParse.data[0].images.original.url;
    //console.log(giphyUrl);
    // Get info from req.body to make the new post
    db.run("INSERT INTO posts (title, paragraph, image) VALUES(?, ?, ?)", req.body.title, req.body.paragraph, giphyUrl, function(err) {

      res.redirect("/posts");
    });
  });

});

// Send user to edit post form
app.get("/post/:id/edit", function(req, res) {
  db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err, data) {
    res.render("edit.ejs", {
      thisPost: data
    })
  });
})

// Update a post
app.put("/post/:id", function(req, res) {
  var giphy = apiStart + req.body.image + apiEnd;
  request(giphy, function(err, response, body) {
    //console.log(body);
    var bodyParse = JSON.parse(body);
    //console.log(bodyParse);
    var giphyUrl = bodyParse.data[0].images.original.url;
    console.log(giphyUrl);
    // Get info from req.body to make the new post
    db.run("UPDATE posts SET title = ?, paragraph = ?, image = ? WHERE id = ?", req.body.title, req.body.paragraph, giphyUrl, req.params.id, function(err) {
      //console.log(req.body.title);
      res.redirect("/post/" + parseInt(req.params.id));
    });
  });
});

// Delete a post
app.delete("/post/:id", function(req, res) {
  db.run("DELETE FROM posts WHERE id = ?", req.params.id,
    function(err) {
      res.redirect("/posts");
    });
});


app.listen(3000);
console.log("Listening on port 3000");