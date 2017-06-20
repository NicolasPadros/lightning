
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

function setLeds(){
    led1 = new five.Led(13);
    led1.blink();
    led2 = new five.Led(12);
    led2.blink();
    led3 = new five.Led(11);
    led3.blink();
}

board.on("ready", function() {
  setLed();
});
