var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var BeaconData = new Schema({
    P_IN : {
        type : Number,
        default : 2
    },
    P_OUT : {
        type : Number,
        default : 0
    },
    Timestamp : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('BeaconData',BeaconData);