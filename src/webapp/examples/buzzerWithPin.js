var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
    var isButtonPressed;
    var operate = false;
    var byte = 0;
    this.pinMode(12, this.MODES.INPUT);
    this.pinMode(9, this.MODES.OUTPUT);

    setInterval(function() {
        board.digitalRead(12, function(data){ isButtonPressed = data; });
        if(isButtonPressed === 0){
                operate = !operate;
                console.log("button was pressed");
        }
        if(operate === true) board.digitalWrite(9, (byte ^= 1));
    },  2000);
});
