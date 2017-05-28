
var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
    console.log("Setting up blink");
    var led = new five.Led(13);
    console.log("Blink");

    var pace = 2000;
    led.blink(pace);

    this.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    on: function() {
      led.on();
    },
    off: function() {
      led.off();
    },
    faster: function(){
      pace = pace -1000;
      led.blink(pace);
    },
    slower: function(){
      pace = pace + 1000;
      led.blink(pace);
    }
  });

    this.on("exit", function(){
        led.off();
    });
});
