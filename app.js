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
    var NewBeacon = new Beacons();
    NewBeacon.P_IN = req.body.P_IN;
    NewBeacon.P_OUT = req.body.P_OUT;
    NewBeacon.Timestamp = req.body.Timestamp

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
    NewBeacon.save((err,rsp) => {
        if(err){
            console.log("error");
        }
        else
        {
             res.json(rsp);
             //console.log(rsp[0]);
        }
    });
    console.log(all);
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


// app.get('/Temp_Hum/16/test', (req, res) => {
//     let Date_time = new Date();
//     let Date_Diff = new Date();
//     Date_Diff.setHours( Date_Diff.getHours() - 1);
//     Date_time = new Date(Date_time).toLocaleString();
//     Date_Diff = new Date(Date_Diff).toLocaleString();
//     //console.log(Date_Diff,Date_time);
//     Sensors.find({Timestamp : {
//         $lte : Date_time,
//         $gt :  Date_Diff
//     }}).exec((err,rsp) => {
//          res.json(rsp);
//          console.log(Date_time);
//          console.log(Date_Diff);
//     });
// });
app.get('/test', (req, res) => {
    /*request('http://202.139.192.114:3000/Temp_Hum/16', { json: true }, (err, response, body) => {
    if (err) {

        return console.log(err); 

    }
    console.log(body[0].Temperature);
    res.json(body[0].Temperature);

});*/

csv
 .fromPath("sanam.csv")
 .on("data", function(data){
     let data_new = [];
     data_new = data;
     let data_0= data_new.split(';');
     console.log(data_0[0]);
      //res.end(JSON.stringify(data));
      //res.json(JSON.stringify(data));
 })
 .on("end", function(){
     //console.log("done");
 });
});


app.listen(3000, () => {
    console.log(`Server started on port 3000 \n http://localhost:3000/`);
});