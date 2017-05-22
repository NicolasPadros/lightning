
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
    console.log("Setting up blink");
  var led = new five.Led(13);
  console.log("Blink");
  led.blink(2000);
});
