var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ERMapi', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var mediaItems = require('./routes/mediaItemRoute');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/mediaitem', mediaItems);

var port = process.env.PORT || 3000; 

app.listen(port, function(){
	console.log("Express server is listening on port", port);
});

