var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

var buttonPin = 2;
var buzzerPin = 9;

board.on("ready", function() {
    var buttonPressed = false;
    var buttonPreviousStatus = 0;
    var byte = 0;

    this.pinMode(buzzerPin, this.MODES.OUTPUT);
    this.pinMode(buttonPin, this.MODES.INPUT);

    this.digitalWrite(buzzerPin, byte);

    setInterval(function() {
       this.digitalRead(buttonPin, function(data){

            // The button is not pressed
            if(data === 1 && buttonPreviousStatus === 0){
                console.log("1: Button is not pressed");
                buttonPreviousStatus = 1;
                buttonPressed = false;
            }

            // The button is pressed;
            else if(data === 0 && buttonPressed === false){
                buttonPressed = true;
                console.log("The button is pressed");
                buttonPreviousStatus = 0;
                this.digitalWrite(buzzerPin, (byte ^= 1));
            }
        });
    }, 500);
});
