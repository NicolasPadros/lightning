


var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

var pins = {
    photoresistor: "A2",
    microphone: "A0",
    led1: 11,
    led2: 12,
    led3: 13,
    buzzer: 3,
    button: 2,
    alarmLed: 1
};

/* Cuando el Galileo Board está listo para operar, ejecuta la functión */
board.on('ready', function() {

    var photoresistor = new five.Sensor({pin: pins.photoresistor, freq: 5000 });

    photoresistor.on("data", function() {
        console.log(this.value);
    });

    var mic = new five.Sensor({pin: pins.microphone, freq: 5000});
    mic.on("data", function() {
        console.log(this.value);
    });

    var passiveBuzzer = new five.Piezo(pins.buzzer);
    var alarmLedOn = new five.Led(pins.alarmLed);

    var button = new five.Button(pins.button);
    button.on("down", function(){
        console.log("button was pressed");
        passiveBuzzer.on();
        alarmLed.on();
    });

    button.on("up", function(){
        passiveBuzzer.off();
        alarmLed.off();
    });
});
