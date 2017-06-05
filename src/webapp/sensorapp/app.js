// ~~~~~~~~~~~~~~~~~~~~~~ http://blog.ricardofilipe.com/post/getting-started-arduino-johhny-five ~~

var five = require('johnny-five');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Galileo = require("galileo-io");
var board = new five.Board({
     io: new Galileo()
});

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next) {
  res.sendFile('./index.html');
});

board.on('ready', function() {
  console.log('Setting up board');

  var state = {
    light: 1, sound: 1, startHour: 0, finishHour: 0
  };

  var pwmLed = new five.Led(11);

  var micFlag = false;
  var photoFlag = false;
  var timeFlag = false;

  console.log('Setting up mic');

  var mic = new five.Sensor("A0");
  mic.on("data", function() {
      if(this.value < state.light && !photoFlag){
        led.off();
        console.log('Led is off because: ' + this.value + ' < ' + state.sound);
      }
      else{
        led.on();
        console.log('Led is off because: ' + this.value + ' < ' + state.sound);
      }
  });

  console.log('mic setup correctly');

  console.log('Setting up photoresistor');

  var photoresistor = new five.Sensor({pin: "A2", freq: 250 });
  photoresistor.on("data", function() {
    if(this.value < state.light && !micFlag){
      led.off();
      console.log('Led is off because: ' + this.value + ' < ' + state.light);
    }
    else{
      led.on();
      console.log('Led is on because: ' + this.value + ' < ' + state.light);
    }
  });

  console.log('photoresistor setup correctly');

  var checkTime = function(){
      var timeFlag = checkDate(state);
  };

  setInterval(checkTime, 60 * 1000 * 2);

  console.log('Setting up socket');

  io.on('connection', function(client) {
    client.on('join', function(handshake) {
      console.log(handshake);
    });

    client.on('update', function(data) {
      state.light = data.light === 'light' ? data.value : state.light;
      state.sound = data.sound === 'sound' ? data.value : state.sound;
      state.startHour = data.startHour === 'startHour' ? data.value : state.startHour;
      state.finishHour = data.finishHour === 'finishHour' ? data.value : state.finishHour;

      client.emit('update', data);
      client.broadcast.emit('update', data);
    });

  });

  console.log('Socket setup correctly');
  console.log('Board setup correctly');
});

function checkDate(state){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var toCheck;
    if(minutes < 30) toCheck = hours;
    else toCheck = hours + 0.5;
    return state.startHour < toCheck && state.finishHour > toCheck;
}

port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
