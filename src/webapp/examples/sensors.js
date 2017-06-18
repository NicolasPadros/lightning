
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

var pins = {
    photoresistor: "A2",
    microphone: "A0",
    led1: 4,
    led2: 5,
    led3: 6,
    buzzer: 8,
    button: 2,
};

/* Cuando el Galileo Board está listo para operar, ejecuta la functión */
board.on('ready', function() {

    var photoresistor = new five.Sensor({pin: pins.photoresistor, freq: 5000 });

    photoresistor.on("data", function() {
        console.log(this.value);
    });

    var mic = new five.Sensor({pin: pins.microphone, freq: 2000});
    mic.on("data", function() {
        console.log(this.value);
    });

    var passiveBuzzer = new five.Piezo(pins.buzzer);
    var alarmLed = new five.Led([pins.led1, pins.led2, pins.led3]);

    var button = new five.Button(pins.button);
    button.on("press", function(){
        console.log("button was pressed");
        passiveBuzzer.play();
        alarmLed.on();
    });

    button.on("release", function(){
        console.log("button was released");
        passiveBuzzer.off();
        alarmLed.off();
    });
});
