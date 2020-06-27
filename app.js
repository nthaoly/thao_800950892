var express = require("express");
var postController = require('./controllers/postController');

var app = express();

//set up template engine
app.set('views engine', 'ejs');

//static files
app.use(express.static(__dirname));

//fire controllers
postController(app);

// listen to port
app.listen(3000);
console.log('You are listening to port 3000');