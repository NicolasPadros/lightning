var jsonfile = require('jsonfile');

var file = './resources/data.json';

var x = 5;

var obj = {test: x};

jsonfile.writeFileSync(file, obj, function (err) {
  console.error(err);
});

var readObj = jsonfile.readFileSync(file);
console.log(readObj.test);
