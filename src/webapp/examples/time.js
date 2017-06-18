var Repeat = require('repeat');

Repeat(getTime).every(2000, 'ms').for(2, 'minutes').start.in(5, 'sec');

function getTime(){
    var date = new Date();
    console.log("Hours: " + date.getHours() + " Minutes: " + date.getMinutes() + " Seconds: " + date.getSeconds());
}
