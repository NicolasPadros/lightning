var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  var byte = 0;
  this.pinMode(12, this.MODES.INPUT);

  setInterval(function() {
     board.digitalRead(12, function(data){
          if(data === 1) console.log("1: Button was not pressed");
          else console.log("0: Button was pressed");
      });
  }, 500);
});
