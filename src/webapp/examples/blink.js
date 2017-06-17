/* ~~~~~~~~~~~~ Blink script for Galileo Test ~~~~~~~~~~~~~~~ */

var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

function setLed(){
    led = new five.Led(13);
    led.blink();
}

board.on("ready", function() {
  setLed();
});
