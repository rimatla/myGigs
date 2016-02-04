/**
 * Created by acoelho on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models/myGigs');


// get files from client side


router.post('/addGig', function(request, response){
    console.log(request.body);

    User.create(request.body, function(err, user){
        console.log(user);
        if(err) {
            console.log(err);
        } else {
            response.sendStatus(200);
        }
    });
});

router.get('/getAllGigs', function(request, response){
    //console.log(request.body);

    User.find({}, function(err, users){
        console.log(users);
        if(err) {
            console.log(err);
        } else {
            response.send(users);
        }
    });
});

router.get('/*', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;