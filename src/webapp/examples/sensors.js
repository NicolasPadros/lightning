
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

    var photoresistor = new five.Sensor({pin: pins.photoresistor, freq: 2000 });
    photoresistor.on("data", function() {
        console.log("Photo data: " + this.value);
    });

    var mic = new five.Sensor({pin: pins.microphone, freq: 2000});
    mic.on("data", function() {
        console.log("Mic data: " + this.value);
    });

    var anode = new five.Led.RGB({
      pins: {
        red: 6,
        green: 5,
        blue: 3
      },
      isAnode: true
    });

    // Add led to REPL (optional)
    this.repl.inject({
      anode: anode
    });

    // Turn it on and set the initial color
    anode.on();
    anode.color("#FF0000");

    anode.blink(1000);
});
