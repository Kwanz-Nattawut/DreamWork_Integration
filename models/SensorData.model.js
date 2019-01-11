var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var SensorData = new Schema({
    Temperature : Number,
    Humidity : Number,
    P_IN : Number,
    P_OUT : Number,
    Timestamp : {
        type : Date,
        default : new Date().toLocaleString()
    }
});

module.exports = mongoose.model('SensorData',SensorData);