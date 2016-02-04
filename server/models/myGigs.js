/**
 * Created by acoelho on 2/4/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    group: {type: String},
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

var myGigs = mongoose.model('User', UserSchema);

module.exports = myGigs;
