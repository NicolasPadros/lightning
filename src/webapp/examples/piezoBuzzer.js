var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  // Creates a piezo object and defines the pin to be used for the signal
  var piezo = new five.Piezo(3);

  // Injects the piezo into the repl
  board.repl.inject({
    on: function(){
        piezo.on();
    },
    off: function(){
        piezo.off();
    }
  });

});
