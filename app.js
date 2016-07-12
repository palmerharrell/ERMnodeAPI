var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/ERMapi', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

autoIncrement.initialize(mongoose);

var mediaItems = require('./routes/mediaItemRoute');
var mediaTypes = require('./routes/mediaTypeRoute');
var appUsers = require('./routes/appUserRoute');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/mediaitem', mediaItems);
app.use('/api/mediatype', mediaTypes);
app.use('/api/appuser', appUsers);

var port = process.env.PORT || 5000; 

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});

