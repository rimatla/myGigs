/**
 * Created by acoelho on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Gig = require('../models/myGigs');


// carrying post data from client and taking over the wall to DB

// DON'T MESS WITH THIS ONE
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



// DON'T MESS WITH THIS ONE
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

//LEAVE THIS ALONE
//delete selected gig
router.delete('/gigDelete:id', function(request, response, next){
    //response.send("Delete!");
    console.log(request.params.id);
    Gig.findByIdAndRemove(request.params.id, function (err, post) {
        response.json(post);
    });
    console.log("Gig has been removed");
});



// JUST A TEST
router.post('/updateGig', function(request, response){
    console.log(request.body);

    var updatedGig = request.body;

    //mongoose creates a new object based on the schema to be sent to DB
    //request.body = data from client
    Gig.findById(request.body._id, function(err, gig){
        console.log(gig);

        if(err) {
            console.log(err);
        } else {
            response.sendStatus(200);
        }

        if(gig.group != updatedGig.group){
            gig.group = updatedGig.group;
        }

        //if(gig.group != updatedGig.group){
        //    gig.group = updatedGig.group;
        //}

        //done

        gig.save(function(err){
            if(err){
                console.log('error saving', err);
            }
        });


    });
});


// JUST A TEST
router.get('/selectGigs', function(request, response){
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

// JUST A TEST
router.get('/getMoreGigs', function(request, response){
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



// catch all router.get
router.get('/*', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;