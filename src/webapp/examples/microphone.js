var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  var mic = new five.Sensor("A0");
  var led = new five.Led(11);

  mic.on("data", function() {
     console.log(this.value);
  });
});
