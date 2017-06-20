/* ~~~~~~~~~~~~ Blink script for Galileo Test ~~~~~~~~~~~~~~~ */

var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

var led = null;

function setLed(){
    led = new five.Led(11);
    led.blink();
}

board.on("ready", function() {
  setLed();

  board.repl.inject({
      stop: function(){
          led.stop();
      }
  });
});
