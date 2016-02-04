/**
 * Created by acoelho on 2/2/16.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
//var User = require('../../models/user');


// get files from client side
router.get('/*', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;