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
    console.log(req.body);
    var hwSend = req.body.DevEUI_uplink.payload_hex;
    console.log(hwSend,hwSend.length);
    let sp = hwSend.split('',2);
    //let type = "";
    let temp = "";
    let hum = "";
    
    for(let i = 4 ; i <= 7 ; i++){
        temp += hwSend[i];
        hum += hwSend[i + 8];
    }
    var dec_temp = parseInt(temp,16);
    var dec_hum = parseInt(hum,16);
    //console.log(dec_temp,dec_hum);
    //console.log(typeof(hwSend));
    //for(let i = 0 ; i < h)
    var NewSensor = new Sensors();
    NewSensor.Temperature = dec_temp;
    NewSensor.Humidity = dec_hum;

    var p_in_data = (Math.random() * 10);
    var p_out_data = (Math.random() * 10);
    if((p_in_data - p_out_data) <= 2 && p_in_data > p_out_data){
        //console.log(p_in_data,p_out_data);
        NewSensor.P_IN = Math.round(p_in_data);
        NewSensor.P_OUT = Math.round(p_out_data);
    }
    else
    {
        NewSensor.P_IN = 1;
        NewSensor.P_OUT = 0;
    }

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


app.post('/predict/post', (req, res) => {
    var json_predict = req.body;
    console.log(json_predict);
});


app.get('/getSanam/:hour', (req, res) => {
        let Date_time = new Date();
        let Date_Diff = new Date();
        Date_Diff.setHours( Date_Diff.getHours() - parseInt(req.params.hour));
        let Date_Diff_min = Date_Diff;
        Date_time = new Date(Date_time).toLocaleString();
        Date_Diff = new Date(Date_Diff).toLocaleString();
        /*Beacons.find({Timestamp : {
            $lte : Date_time,
            $gt :  Date_Diff
        }},'P_IN Timestamp').exec((err,rsp) => {
            let show = [];
            //console.log(rsp[6].P_IN);
            //console.log(rsp[0])
            /*for(let i = 0 ; i < Object.keys(rsp).length ; i ++){
                show.push(rsp[i].P_IN);
            }
        });*/
            Beacons.find({}).sort({Timestamp: 'asc'}).limit(1).exec((err,test) => {
                //console.log("test : ",test);
                var cur = new Date();
                var diff = Math.abs(test[0].Timestamp - cur)/36e5;
                if(diff < req.params.hour){
                     res.json("ERROR");
                }
                else
                {
                     Beacons.find({},'P_IN').exec((err,beacon) => {
                         let show = [];
                        for(let i = 0 ; i < Object.keys(beacon).length ; i ++){
                            show.push(beacon[i].P_IN);
                        }
                          res.json(show);
                          console.log(beacon.length,parseInt(req.params.hour));
                     });
                }
                console.log("Date_Diff_min",Math.abs(test[0].Timestamp - cur)/36e5);
            });

            
      
    });

app.get('/beacon/train/16', (req, res) => { ///all data beacondatas
    Beacons.find({}).exec((err,rsp) => {
        res.json(rsp);
    });
});

app.get('/Temp_Hum/16', (req, res) => {  //all data sensordatas

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