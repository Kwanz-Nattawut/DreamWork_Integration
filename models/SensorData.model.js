var mongoose = require('../db/mongoose');
const timeZone = require('mongoose-timezone');

var Schema = mongoose.Schema;

var SensorData = new Schema({
    Temperature : Number,
    Humidity : Number,
    P_IN : Number,
    P_OUT : Number,
    Timestamp : {
        type : Date,
        default : Date.now
    }
});

SensorData.plugin(timeZone, { paths: ['Timestamp'] });

module.exports = mongoose.model('SensorData',SensorData);