var express = require('express');
var request = require('request');
const http = require('http');
var bodyParser = require('body-parser');
var Sensors = require('./models/SensorData.model');
var Beacons = require('./models/BeaconData.model');
var app = express();
var csv = require("fast-csv");
const dateFormat = require('dateformat');
// import * as dateFormat from "dateformat";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("<h1>TESA TOP GUN REALLY 2019 DREAMWORK</h1>");
});

app.post('/beacon', (req, res) => {
    
});

app.post('/HW_Send', (req, res) => {
    var all = req.body;
    var NewSensor = new Sensors(all);
    NewSensor.save((err,rsp) => {
        if(err){
            console.log("error");
        }
        else
        {
             res.json(rsp);
             //console.log(rsp[0]);
        }
    });
    /*var NewBeacon = new Beacons();
    NewBeacon.P_IN = req.body.P_IN;
    NewBeacon.P_OUT = req.body.P_OUT;
    NewBeacon.Timestamp = req.body.Timestamp;

    
    NewBeacon.save((err,rsp) => {
        if(err){
            console.log("error");
        }
        else
        {
             res.json(rsp);
             //console.log(rsp[0]);
        }
    });*/
    console.log(all);
     res.json(all);
});

app.get('/Temp_Hum/16', (req, res) => {
    let Date_time = new Date();
    let Date_Diff = new Date();
    Date_Diff.setHours( Date_Diff.getHours() - 1);
    Date_time = new Date(Date_time).toLocaleString();
    Date_Diff = new Date(Date_Diff).toLocaleString();
    //console.log(Date_Diff,Date_time);
    Sensors.find({Timestamp : {
                 $lte : Date_time,
                 $gt :  Date_Diff
             }}).exec((err,rsp) => {
         res.json(rsp);
    });
});


app.get('/test', (req, res) => {

    let data = [];
    let buff = [];
    return new Promise(function (resolve, reject) {
        csv
            .fromPath("./sanam.csv")
            .on("data", function (str) {
                data.push(str);
            })
            .on("end", function () {
                resolve(data);
            });
        //console.log(data[0])
    });

});

app.listen(3000, () => {
    console.log(`Server started on port 3000 \n http://localhost:3000/`);
});