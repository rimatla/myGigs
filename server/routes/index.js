/**
 * Created by acoelho on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var Gig = require('../models/myGigs');


// carrying post data from client and taking over the wall to DB

// Post Data To DB
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



// Get Data From DB
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


//Delete Selected Gig
router.delete('/gigDelete:id', function(request, response, next){
    //response.send("Delete!");
    console.log(request.params.id);
    Gig.findByIdAndRemove(request.params.id, function (err, post) {
        response.json(post);
    });
    console.log("Gig has been removed");
});



// Update Selected Gig
router.post('/updateGig', function(request, response){
    console.log(request.body);

    var updatedGig = request.body;

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

        if(gig.address != updatedGig.address){
            gig.address= updatedGig.address;
        }
        if(gig.eventTime != updatedGig.eventTime){
            gig.eventTime = updatedGig.eventTime;
        }
        if(gig.endTime != updatedGig.endTime){
            gig.endTime = updatedGig.endTime;
        }
        if(gig.goneUntil != updatedGig.goneUntil){
            gig.goneUntil = updatedGig.goneUntil;
        }
        if(gig.todo != updatedGig.todo){
            gig.todo = updatedGig.todo;
        }
        if(gig.pay != updatedGig.pay){
            gig.pay = updatedGig.pay;
        }

        if(gig.Charts != updatedGig.Charts){
            gig.Charts = updatedGig.Charts;
        }

        if(gig.PDiem != updatedGig.PDiem){
            gig.PDiem = updatedGig.PDiem;
        }

        //done!!

        gig.save(function(err){
            if(err){
                console.log('error saving', err);
            }
        });
    });
});




// Catch All router.get
router.get('/*', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;