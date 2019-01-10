var express = require('express');
var request = require('request');
const http = require('http');
var bodyParser = require('body-parser');
var Sensors = require('./models/SensorData.model');
var app = express();
var dateformat = require('dateformat');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("<h1>TESA TOP GUN REALLY 2019 DREAMWORK</h1>");
});

app.post('/HW_Send', (req, res) => {
    var all = req.body;
    var New = new Sensors(all);

    New.save((err,rsp) => {
        if(err){
            console.log("error");
        }
        else
        {
             res.json(rsp);
             //console.log(rsp[0]);
        }
    })
    console.log(New);
});

app.get('/Temp_Hum/16', (req, res) => {
    Sensors.find({}).exec((err,rsp) => {
         res.json(rsp);
         let datetest = [];
         for(let i = 0 ; i < Object.keys(rsp).length ;i++){
            datetest[i] =  dateFormat(rsp[i], "dddd dd mmmm yyyy H:MM:ss");
         }
         console.log(datetest);
         
    });
});

app.get('/test', (req, res) => {
    request('http://202.139.192.114:3000/Temp_Hum/16', { json: true }, (err, response, body) => {
    if (err) {

        return console.log(err); 

    }
    console.log(body[0].Temperature);
    res.json(body[0].Temperature);

});

});


app.listen(3000, () => {
    console.log(`Server started on port 3000 \n http://localhost:3000/`);
});