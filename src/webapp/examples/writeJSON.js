var jsonfile = require('jsonfile');

var file = './resources/data.json';
var obj = {test: 'parameter'};

jsonfile.writeFile(file, obj, function (err) {
  console.error(err);
});
