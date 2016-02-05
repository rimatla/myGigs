/**
 * Created by acoelho on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Gig = require('../models/myGigs');


// carrying post data from client and taking over the wall to DB
router.post('/addGig', function(request, response){
    console.log(request.body);

    //mongoose creates a new object based on the schema to be sent to DB
    //request.body = data from client
    Gig.create(request.body, function(err, gig){
        console.log(gig);
        if(err) {
            console.log(err);
        } else {
            response.sendStatus(200);
        }
    });
});

// router taking data from DB over the wall back to client
router.get('/getAllGigs', function(request, response){
    //console.log(request.body);

    //schema query data from DB
    Gig.find({}, function(err, gigs){
        console.log(gigs);
        if(err) {
            console.log(err);
        } else {
            response.send(gigs);
        }
    });
});

//delete selected gig
router.delete('/selectedGig:id', function(request, response, next){
    //response.send("Delete!");
    console.log(request.params.id);
    Gig.findByIdAndRemove(request.params.id, function (err, post) {
        response.json(post);
    });
    console.log("Gig has been removed");
});


// catch all router.get
router.get('/*', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;