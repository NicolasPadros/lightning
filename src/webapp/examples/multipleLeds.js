
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

function setLeds(){
    led1 = new five.Led(13);
    led1.blink(1000);
    led2 = new five.Led(12);
    led2.blink(1000);
    led3 = new five.Led(11);
    led3.blink(1000);
}

board.on("ready", function() {
  setLeds();
});
