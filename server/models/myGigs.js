/**
 * Created by acoelho on 2/4/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema matching ng-models
var GigSchema = new Schema({
    group: {type: String},
    address: {type: String},
    eventTime: {type: Date},
    endTime: {type: Date},
    goneUntil: {type: Date},
    todo: {type: String},
    pay: {type: Number},
    yesCharts: {type: Boolean},
    noCharts: {type: Boolean},
    yesPDiem: {type: Boolean},
    noPDiem: {type: Boolean}

});

// models
// var Gig equals bellow
var myGigs = mongoose.model('Gig', GigSchema);

module.exports = myGigs;

