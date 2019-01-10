function add(add){
    var NewSensor = new Sensors(add);
   NewSensor.save((err) => {
       if(err)
       {
           throw err;
       }
       else
       {
        console.log(NewSensor);
        res.json(NewSensor);
       }
    });
    
}

function add1(add){
    var NewBeacon = new Beacons(add);
    NewBeacon.save((err) => {
        if(err){
            throw err;
        }
        else
        {
            console.log(NewBeacon);
             res.json(NewBeacon);
        }
    })
}