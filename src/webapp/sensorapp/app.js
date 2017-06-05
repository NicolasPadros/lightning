// ~~~~~~~~~~~~~~~~~~~~~~ http://blog.ricardofilipe.com/post/getting-started-arduino-johhny-five ~~

// var five = require('johnny-five');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var Galileo = require("galileo-io");
// var board = new five.Board({
//     io: new Galileo()
// });

var led = null;


app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next) {
  res.sendFile('./index.html');
});

// board.on('ready', function() {
//   console.log('Galileo is ready.');
//
//   // Initial state for the LED light
//   var state = {
//     red: 1, green: 1, blue: 1
//   };
//
//   // Map pins to digital inputs on the board
//   led = new five.Led.RGB({
//     pins: {
//       red: 3,
//       green: 6,
//       blue: 10
//     }
//   });
//
//   // Helper function to set the colors
// var setStateColor = function(state) {
//     led.color({
//       red: state.red,
//       blue: state.blue,
//       green: state.green
//     });
// };
//
//   // Listen to the web socket connection
//   io.on('connection', function(client) {
//     client.on('join', function(handshake) {
//       console.log(handshake);
//     });
//
//     // Set initial state
//     setStateColor(state);
//
//   // Every time a 'rgb' event is sent, listen to it and grab its new values for each individual colour
//     client.on('rgb', function(data) {
//       state.red = data.color === 'red' ? data.value : state.red;
//       state.green = data.color === 'green' ? data.value : state.green;
//       state.blue = data.color === 'blue' ? data.value : state.blue;
//
//       // Set the new colors
//       setStateColor(state);
//
//       client.emit('rgb', data);
//       client.broadcast.emit('rgb', data);
//     });
//
//     // Turn on the RGB LED
//     led.on();
//   });
// });

port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
