// client.js

(function() {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    var light = document.getElementById('light');
    var sound = document.getElementById('sound');
    var startHour = document.getElementById('startHour');
    var finishHour = document.getElementById('finishHour');

    var button = document.getElementById('operateButton');

    // function emitValue(color, e) {
    //     socket.emit('rgb', {
    //         color: color,
    //         value: e.target.value
    //     });
    // }

    function emitValue(device, value) {
        socket.emit('update', {
            device: device,
            value: value
        });
    }

    function start(){
        var operate = button.value;
        socket.emit('operate',{
            value: operate
        });
        if(button.value === 'false'){
            button.innerHTML = 'Start';
            button.value = 'true';
        }else{
            button.innerHTML = 'Stop';
            button.value = 'false';
        }
    }

    // red.addEventListener('change', emitValue.bind(null, 'red'));
    // blue.addEventListener('change', emitValue.bind(null, 'blue'));
    // green.addEventListener('change', emitValue.bind(null, 'green'));

    light.addEventListener('change', emitValue('light', light.value));
    sound.addEventListener('change', emitValue('sound', sound.value));
    startHour.addEventListener('change', emitValue('startHour', startHour.value));
    finishHour.addEventListener('change', emitValue('finishHour', finishHour.value));

    button.addEventListener('click', start());

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    // socket.on('rgb', function(data) {
    //     var color = data.color;
    //     document.getElementById(color).value = data.value;
    // });

    socket.on('rgb', function(data) {
        var device = data.device;
        document.getElementById(device).value = data.value;
    });

}());
