var jsonfile = require('jsonfile');

var file = './resources/data.json';

var state={
    light: 50,
    sound: 10
};

var buzzerOn = false;
var alarmLedOn = false;
var lightSystemActive = false;
var alarmSystemActive = false;

var obj = {light: state.light, sound: state.sound, buzzerOn: buzzerOn.toString(), alarmLedOn: alarmLedOn.toString(), lightSystemActive: lightSystemActive.toString(), alarmSystemActive: alarmSystemActive.toString()};

jsonfile.writeFileSync(file, obj, function (err) {
  console.error(err);
});

console.log(obj);
