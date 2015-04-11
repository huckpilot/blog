//This is my blog app

////////////////////////
//Admin stuff
////////////////////////


// Get access to the sqlite3 module
var sqlite3 = require("sqlite3");

// Specify which file is the database
var db = new sqlite3.Database("blog.db");

// This allows me to create the app
var express = require("express");
var app = express();

// Var ejs sets the templating engine
var ejs = require("ejs");
app.set("view_engine", "ejs");

// Use body parser to parse the body
var bodyParser = require("body-parser");
// Tell app which method to use when parsing
app.use(bodyParser.urlencoded({extended: false}))

// Allow for method override
var methodOverride = require("method-override");
// tell app which override method to use
app.use(methodOverride("_method"))

// Used to give the blog posts unique id's. I don't think I will need this but I am unsure so I am keeping it for now
// var counter = 1


////////////////////////
//Fun stuff 
////////////////////////

// This will redirect to my blog if someone does not specify a route.
app.get("/", function(req, res){
  res.redirect("/posts")
});

// This is going to show all blog posts
app.get("/posts", function(req, res){
  db.all("SELECT * FROM posts", function(err, data){
    res.render("index.ejs", {blog: data})
  });
});




app.listen(3000);
console.log("Listening on port 3000");

















