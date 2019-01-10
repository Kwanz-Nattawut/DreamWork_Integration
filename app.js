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
    // var NewBeacon = new Beacons(req.body);
    // NewBeacon.save((err,beacon) => {
    //     if(err){
    //         throw err;
    //     }
    //     else
    //     {
    //         console.log(beacon);
    //         res.json(beacon);
    //     }
    // });
    console.log(req.body);
});

app.post('/HW_Send', (req, res) => {
    var NewSensor = new Sensors(req.body);
    NewSensor.save((err,sensor) => {
        if(err){
            throw err;
        }
        else
        {
            console.log(sensor);
            res.json(sensor);
        }
    });

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
    let data_arr = [];
    return new Promise(function (resolve, reject) {
        csv
            .fromPath("./sanam.csv")
            .on("data", function (str) {
                data.push(str);
            })
            .on("end", function () {
                for(let i = 1 ; i < Object.keys(data).length ; i++){
                    buff[i - 1] = Object.values(data[i]).toString();
                    data_arr[i - 1] = buff[i - 1].split(';');
                }
                resolve(data_arr);
                console.log(data_arr[(Object.keys(data_arr).length - 1)]);
            });
    });

});

app.listen(3000, () => {
    console.log(`Server started on port 3000 \n http://localhost:3000/`);
});