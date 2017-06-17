// client.js

(function() {
    var socket = io.connect(window.location.hostname + ':' + 3000);
    var light = document.getElementById('light');
    var sound = document.getElementById('sound');
    var led1Radio = document.getElementById();
    var led2Radio = document.getElementById();
    var led3Radio =  document.getElementById();
    var activeBuzzerCheckbox =  document.getElementById();
    var rgbLedCheckbox =  document.getElementById();
    var activeLightSystemCheckBox =  document.getElementById();
    var activeAlarmSystemCheckbox =  document.getElementById();
    var saveButton = document.getElementById();
    var defaultButton = document.getElementById();

    function emitValue(device, e) {
        alert('emitting value');
        socket.emit('update', {
            device: device,
            value: e.target.value
        });
    }

    function emitChecked(emitValue, e){
        socket.emit(emitValue, {
            value: e.target.checked
        });
    }

    function emitButtonValue(emitValue, e){
        socket.emit(emitValue, {
            value: e.target.value
        });
    }

    light.addEventListener('change', emitValue.bind(null, 'light'));
    sound.addEventListener('change', emitValue.bind(null, 'sound'));
    activeBuzzerCheckbox.addEventListener('change', emitChecked('toggleBuzzer', 'activeBuzzerCheckbox'));
    rgbLedCheckbox.addEventListener('change', emitChecked('toggleAlarmLed','rgbLedCheckbox'));
    activeLightSystemCheckBox.addEventListener('change', emitChecked('toggleLightSystem', 'lightSystemCheckBox'));
    activeAlarmSystemCheckBox.addEventListener('change', emitChecked('toggleAlarmSystem', 'alarmSystemCheckbox'));
    saveButton.addEventListener('click', emitButtonValue('saveValues', 'saveButton'));
    defaultButton.addEventListener('click', emitButtonValue('defaultValues', 'defaultButton'));


    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    socket.on('rgb', function(data) {
        var device = data.device;
        document.getElementById(device).value = data.value;
    });

}());


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
