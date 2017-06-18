var jsonfile = require('jsonfile');

var file = './resources/data.json';

console.dir(jsonfile.readFileSync(file));
