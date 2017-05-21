
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board;
var photoresistor;

board.on("ready", function() {

    console.log('Setting up sensors');
  var mic = new five.Sensor("A0");
  var led = new five.Led(11);
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

module.exports = Sensors;
