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

var state = {
  light: 1, sound: 1
};

var pins = {
    photoresistor: "A2",
    microphone: "A0",
    led1: 11,
    led2: 12,
    led3: 13,
    buzzer: 3,
    button: 2,
    alarmLed: {
        red: 6,
        green: 5,
        blue: 3
    }
};

var photoresistor = null;
var mic = null;
var button = null; /* Apaga la alarma */
var alarmLed = null; /* Se prende al activarse la alarma*/
var passiveBuzzer = null; /* Se prende al activarse la alarma */
var led = new five.Led(pins.led1); /* Luz dependiente del sistema de luces */
var lightSystemActive = false; /* Señala si el sistema de luces está activo o no */
var alarmSystemActive = false; /* Señala si el sistema de alarma está activo o no */
var buzzerActive = false;
var alarmLedActive = false;
var isTimeInsideInterval = false;
var startTime;
var finishTime;

app.use(express.static(__dirname + '/public')); /* Usa todos los recursos estáticos del directorio public*/

/* Responda al request del url -  Al entrar a "https://localhost:8080" va a responder dando el index.html*/
app.get('/', function(req, res, next) {
  res.sendFile('./index.html');
});

/* Cuando el Galileo Board está listo para operar, ejecuta la functión */
board.on('ready', function() {

    console.log('Setting up photoresistor');

    /* Inicializo el photoresistor en el Pin y con la frecuencia en la que va a recabar datos */
    photoresistor = new five.Sensor({pin: pins.photoresistor, freq: 2000 });

    /* función que se ejecuta cuando el photoresistor recaba información*/
    photoresistor.on("data", function() {

        var turnLightOn = this.value < state.light;
        if(lightSystemActive && turnLightOn){
            led.on();
            console.log('Led is on because: ' + this.value + ' < ' +  state.light);
        }
    });

    console.log('Setting up microphone');

    mic = new five.Sensor({pin: pins.microphone, freq: 2000});
    mic.on("data", function() {

        var turnAlarmOn = this.value < state.sound;
        if(alarmSystemActive && turnAlarmOn){
            console.log('Turn on alarm because: ' + this.value + ' < ' + state.sound);
            // if(buzzerOn){
            //     passiveBuzzer.play();
            // }
            if(alarmLedOn){
                anode.on();
                anode.color("#FF0000");
                anode.blink(1000);
            }
        }
    });

    console.log('Setting up button');
    // set up button

    console.log('Setting up buzzer');
    // set up buzzer

    console.log('Setting up alarmLed');
    var anode = new five.Led.RGB({
      pins: {
        red: pins.alarmLed.red,
        green: pins.alarmLed.green,
        blue: pins.alarmLed.blue
      },
      isAnode: true
    });


    setClientActions();

  console.log('Socket setup correctly');
  console.log('Board setup correctly');
});

function setClientActions(){
    console.log('Setting up socket');

    io.on('connection', function(client) {
        client.on('join', function(handshake) {
        console.log(handshake);
    });

    client.on('update', function(data) {
        state.light = data.device === 'light' ? data.value : state.light;
        state.sound = data.device === 'sound' ? data.value : state.sound;

        client.emit('update', data);
        client.broadcast.emit('update', data);
    });

    client.on('toggleAlarmSystem', function(data) {
        alarmSystemActive = data.value;
    });

    client.on('toggleLightSystem', function(data){
        lightSystemActive = data.value;
    });

    client.on('toggleBuzzer', function(data){
        buzzerOn = data.value;
    });

    client.on('toggleAlarmLed', function(data){
        alarmLedOn = data.value;
    });

    client.on('defaultValues', function(){
        lightSystemActive = false;
        alarmSystemActive = false;
        buzzerOn = false;
        alarmLedOn = false;
        state.light = 1;
        state.sound = 1;
    });

    client.on('saveValues', function(data){

    });

    client.on('setStartTime', function(data){
        startTime = data.value;
    });

    client.on('setFinishTime', function(data){
        finishTime = data.value;
    });
  });
}

function checkDate(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var timeToCheck;
    if(minutes < 30) timeToCheck = hours;
    else timeToCheck = hours + 0.5;
    isTimeInsideInterval = startTime < timeToCheck && finishTime > timeToCheck;
}

port = process.env.PORT || 3000;

server.listen(port);
console.log("Server listening on http://localhost:" + port);
