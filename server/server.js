/**
 * Created by acoelho on 2/2/16.
 */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var index = require('./routes/index');


var app = express();

//use files from client side
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);


// MONGO set-up
// creates a DB
var mongoURI = 'mongodb://localhost:27017/myGigs';
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error',function(err){
    console.log('MongoDB error', err);
});

mongoDB.on('open', function(){
    console.log('MongoDB connected!');
});

// set up local host
var server = app.listen(4000,function(){
    var port = server.address().port;
    console.log('listening on port:', port);
});