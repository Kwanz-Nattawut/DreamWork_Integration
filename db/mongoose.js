var mongoose = require('mongoose');
var option = {
    /*auth : {
        user : 'dreamwork',
        password : 'tgr2019'
    },*/
    useNewUrlParser: true
};

mongoose.connect('mongodb://localhost/DreamWork',option);

module.exports = mongoose;
