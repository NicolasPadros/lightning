
var five = require("johnny-five");
var Galileo = require("galileo-io");
var read = require('../helpers/configurationJSONEditor').readConfiguration;
var board = new five.Board({
  io: new Galileo()
});
var luminosityParam;
var debicelParam;
var startHourParam;
var finishHourParam;

board.on("ready", function() {
    console.log("Setting up blink");
    var led = new five.Led(13);
    console.log("Blink");
    led.blink(2000);

    this.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    on: function() {
      led.on();
    },
    off: function() {
      led.off();
    }
  });

    this.on("exit", function(){
        led.off();
    });

    readParameters();
});

function readParameters(){
    var json = read();

    luminosityParam = json[0];
    decibelParam = json[1];
    startHourParam = json[2];
    finishHourParam = json[3];

    console.log(luminosityParam);
    console.log(decibelParam);
    console.log(startHourParam);
    console.log(finishHourParam);
}
