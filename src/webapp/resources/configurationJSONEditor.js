var jsonfile = require('jsonfile');

module.exports = {

    setConfiguration: function(file, luminosityParam, decibelsParam, startTimeParam, endTimeParam){

        var obj = {
            luminosity: luminosityParam,
            decibels: decibelsParam,
            startTime: startTimeParam,
            endTime: endTimeParam

        };
        jsonfile.writeFile(file, obj, function(err){
            if(err === null) console.log("it was written correctly");
            else console.error(err);
        });
    },

    readConfiguration: function(file){
        jsonfile.readFile(file, function(err, obj){
            if(err === null){
                return obj;
            }else{
                console.error(err);
            }
        });
    }
};
