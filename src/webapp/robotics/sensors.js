
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board;
var photoresistor;

board.on("ready", function() {

console.log('Setting up sensors');
  var mic = new five.Sensor("A0");
  var led = new five.Led(13);
  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  console.log('OK');
  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log('photoresistor reading: ' + this.value);
  });

  mic.on("data", function() {
    console.log('Mic reading: ' + this.value);
  });
});

function readParameters(){
    var json = read();

    luminosityParam = json[0];
    decibelParam = json[1];
    startHourParam = json[2];
    finishHourParam = json[3];

    console.log(luminosityParam);
    console.log(decibelParam);
    console.log(startHourParam);
    console.log(finishHourParam);
}

module.exports = Sensors;
