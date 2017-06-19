var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  var byte = 0;
  this.pinMode(12, this.MODES.INPUT);

  setInterval(function() {
      this.digitalRead(12, function(data){
          console.log(data);
      });
  }, 1000);
});
