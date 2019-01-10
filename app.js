var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send("<h1>TESA TOP GUN REALLY 2019 DREAMWORK</h1>");
});



app.listen(3000, () => {
    console.log(`Server started on port 3000 \n http://localhost:3000/`);
});