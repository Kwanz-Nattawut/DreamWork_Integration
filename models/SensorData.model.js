var mongoose = require('../db/mongoose');
var dateFormat = require('dateformat');
var Schema = mongoose.Schema;
var date = dateFormat(new Date(), "dd mmm yyyy HH:MM:ss");
var SensorData = new Schema({
    Temperature : Number,
    Humidity : Number,
    P_IN : Number,
    P_OUT : Number,
    Timestamp : {
        type : Date,
        default : date
    }
});

module.exports = mongoose.model('SensorData',SensorData);