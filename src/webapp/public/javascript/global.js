
$(document).ready(function(){
    $.getJSON('/settings', function(data){
        document.getElementById('decibels').value = json[1];

    });
});
