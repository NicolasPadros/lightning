var jsonfile = require('jsonfile');

var file = 'configuration.json';
var obj = {name: 'Tomas', lastName: 'Fernández'};
var edit ='TomasEditted';

jsonfile.writeFile(file, obj, function (err) {
    if(err === null) console.log("It was written correctly");
    else console.error(err);

    var currentPackage = require('./configuration.json');
    var currentStringPackage = JSON.stringify(currentPackage); // si esta línea no está y se imprime un string al lado como abajo, aparece que son solamente 2 objetos
    console.log('The contents are: ' + currentStringPackage);
    console.log('or: ');
    console.log('Name: ' + JSON.stringify(currentPackage.name));
    console.log('Last Name: ' + JSON.stringify(currentPackage.lastName));
});
console.log('Reading file....');

jsonfile.readFile(file, function(err, obj) {
    console.log(obj.name + '1');
    console.log(obj.lastName);
  console.dir(obj);
});
