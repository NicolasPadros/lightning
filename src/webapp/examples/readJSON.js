var jsonfile = require('jsonfile');

var file = './resources/data.json';

jsonfile.readFile(file, function(err, obj){
    console.log(obj.test);
});
