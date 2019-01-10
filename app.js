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

app.post('/putSanam', (req, res) => {
    var NewBeacon = new Beacons(req.body);
    NewBeacon.save((err,beacon) => {
        if(err){
            throw err;
        }
        else
        {
            console.log(beacon);
            res.json(beacon);
        }
    });
    /*console.log(req.body);
    console.log(req.body.P_IN);
    console.log(req.body.P_OUT);*/
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

app.get('/getSanam/:hour', (req, res) => {
        let Date_time = new Date();
        let Date_Diff = new Date();
        Date_Diff.setHours( Date_Diff.getHours() - parseInt(req.params.hour));
        Date_time = new Date(Date_time).toLocaleString();
        Date_Diff = new Date(Date_Diff).toLocaleString();
        Beacons.find({Timestamp : {
            $lte : Date_time,
            $gt :  Date_Diff
        }},'P_IN Timestamp').exec((err,rsp) => {
            let show = [];
            //console.log(rsp[6].P_IN);
            console.log(rsp.length);
            for(let i = 0 ; i < Object.keys(rsp).length ; i ++){
                show.push(rsp[i].P_IN);
            }

            if(show.length == 0){
                 res.json("ไม่พบข้อมูลการเข้าชม เวลานี้");
            }
            else
            {
                res.json(show);
            }

             console.log(show.length,parseInt(req.params.hour));
        });
    });

app.get('/beacon/train/16', (req, res) => {
    Beacons.find({}).exec((err,rsp) => {
        res.json(rsp);
    });
});

app.get('/Temp_Hum/16', (req, res) => {

    //console.log(Date_Diff,Date_time);
    Sensors.find({}).exec((err,rsp) => {
         res.json(rsp);
    });
});


/*app.get('/test', (req, res) => {

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
                console.log(data_arr[0].length,data_arr.length);
                for(let j = 0 ; j < data_arr.length ; j++){
                    for(let i = 1 ; i < data_arr[0].length ; i ++){
                        Beacons.insertMany({P_IN : data_arr[j][i] , P_OUT : 0 , Timestamp : data_arr[j][0]});
                    }
                } 
                Beacons.find({}).exec((err,beacon) => {
                     //res.json(beacon);
                })
            });
    });

});*/

app.listen(3000, () => {
    console.log(`Server started on port 3000 \n http://localhost:3000/`);
});