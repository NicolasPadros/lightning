var jsonfile = require('jsonfile');

module.exports = {

    setConfiguration: function(luminosityParam, decibelsParam, startTimeParam, endTimeParam){

        var obj = {
            luminosity: luminosityParam,
            decibels: decibelsParam,
            startTime: startTimeParam,
            endTime: endTimeParam

        };
        jsonfile.writeFile('/home/tomi/projects/lightning/src/webapp/helpers/configuration.json', obj, function(err){
            if(err === null) console.log("it was written correctly");
            else console.error(err);
        });
    },

    readConfiguration: function(){
        console.log('Attempting to read file...');
        var path = '/home/tomi/projects/lightning/src/webapp/helpers/configuration.json';
        var json = jsonfile.readFileSync(path);
        console.log("It was read correctly");
        console.log(json);
        return json;
    }
};
