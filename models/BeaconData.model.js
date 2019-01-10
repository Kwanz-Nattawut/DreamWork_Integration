var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var BeaconData = new Schema({
    P_IN : Number,
    P_OUT : Number,
    Timestamp : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('BeaconData',BeaconData);