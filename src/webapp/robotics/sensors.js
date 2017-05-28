
var five = require("johnny-five");
var Galileo = require("galileo-io");
var read = require('../helpers/configurationJSONEditor').readConfiguration;
var board;
var photoresistor;
var luminosityParam;
var debicelParam;
var startHourParam;
var finishHourParam;

board.on("ready", function() {

    readParameters();
    console.log('Setting up sensors');
  var mic = new five.Sensor("A0");
  var led = new five.Led(13);
  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log('photoresistor reading: ' + this.value);
  });

  mic.on("data", function() {
    led.brightness('mic reading' + this.value >> 2);
  });

  console.log('Everything is up and running');
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
