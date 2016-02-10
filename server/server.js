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

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// MONGO set-up
// creates a DB
//var mongoURI = 'mongodb://localhost:27017/myGigs';

//Heroku + MongoLab
    var mongoURI = 'mongodb://rimatla13:sparta13@ds061395.mongolab.com:61395/mygigs';
    var mongoDB = mongoose.connect(mongoURI).connection;



mongoDB.on('error',function(err){
    console.log('MongoDB error', err);
});

mongoDB.on('open', function(){
    console.log('MongoDB connected!');
});



//heroku + mongolab
var server = app.listen(process.env.PORT || 5000, function(){
    var port = server.address().port;
    console.log('listening on port', port);
});


 //set up local host
//var server = app.listen(3000,function(){
//    var port = server.address().port;
//    console.log('listening on port:', port);
//});

