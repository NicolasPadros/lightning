var socket;
var light;
var sound;
var led1Radio;
var led2Radio;
var led3Radio;
var activeBuzzerCheckbox;
var rgbLedCheckbox;
var activeLightSystemCheckBox;
var activeAlarmSystemCheckBox;
var saveButton;
var defaultButton;


$(document).ready(function(){
    socket = io.connect(window.location.hostname + ':' + 3000);

    prepareDOMVariables();
    //
    addEventListeners();
    //
    setSocketActions();
});

function prepareDOMVariables(){
    light = document.getElementById('light');
    sound = document.getElementById('sound');
    led1Radio = document.getElementById('led1Radio');
    led2Radio = document.getElementById('led2Radio');
    led3Radio =  document.getElementById('led3Radio');
    activeBuzzerCheckbox =  document.getElementById('activeBuzzerCheckbox');
    rgbLedCheckbox =  document.getElementById('alarmLedCheckbox');
    activeLightSystemCheckBox =  document.getElementById('lightSystemCheckBox');
    activeAlarmSystemCheckBox =  document.getElementById('alarmSystemCheckbox');
    saveButton = document.getElementById('saveButton');
    defaultButton = document.getElementById('defaultButton');
}

function emitChecked(emitValue, e){
    socket.emit(emitValue, {
        value: e.target.checked
    });
}

function emitValue(device, e) {
    socket.emit('update', {
        device: device,
        value: e.target.value
    });
}

function emitButtonValue(emitValue, e){
    socket.emit(emitValue, {
        value: e.target.value
    });
}

function addEventListeners(){
    light.addEventListener('change', emitValue.bind(null, 'light'));
    sound.addEventListener('change', emitValue.bind(null, 'sound'));
    activeBuzzerCheckbox.addEventListener('change', emitChecked.bind(null, 'toggleBuzzer'));
    rgbLedCheckbox.addEventListener('change', emitChecked.bind(null,'toggleAlarmLed'));
    activeLightSystemCheckBox.addEventListener('change', emitChecked.bind(null, 'toggleLightSystem'));
    activeAlarmSystemCheckBox.addEventListener('change', emitChecked.bind(null, 'toggleAlarmSystem'));
    saveButton.addEventListener('click', emitButtonValue.bind(null, 'saveValues'));
    defaultButton.addEventListener('click', emitButtonValue.bind(null, 'defaultValues'));
}

function setSocketActions(){
    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');
    });

    socket.on('rgb', function(data) {
        var device = data.device;
        document.getElementById(device).value = data.value;
    });
}


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
};
