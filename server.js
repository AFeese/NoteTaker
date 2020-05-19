// Dependencies
const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const dbJSON = require('./db/db.json')
const PORT = process.env.PORT || 8000;
const dbJson = require('./db/db.json')

// Sets up the Express App
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static('./'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Needed?
require("./apiRoutes")(app);
require("./htmlRoutes")(app);





// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});