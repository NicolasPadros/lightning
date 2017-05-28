var express = require('express');
var router = express.Router();
var read = require('../helpers/configurationJSONEditor').readConfiguration;
var write = require('../helpers/configurationJSONEditor').setConfiguration;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pug/index', { title: 'Express' });
});

/* GET the lightning home page */
router.get('/home', function(req, res, next){
  res.render('pug/home', {title: 'Lightning'});
});

/* POST request for the form */
router.post('/home', function(req, res, next){
    console.log('Username:' + req.body.username);
    console.log('Password: ' + req.body.password);
    return;
});

router.get('/settings', function(req, res, next){
    var json = read();
    if(json === null) res.send("Error");
    res.send("OK");
});

router.get('/app', function(req, res, next){
    res.render('pug/app');
});

router.post('/settings', function(req, res, next){
    console.log("Post request to app");
    console.log('Light intensity: ' + req.body.lightIntensity);
    console.log('Decibels: ' + req.body.decibels);
    console.log('Start Time: ' + req.body.startHour);
    console.log('End Time: ' + req.body.finishHour);
    write(req.body.lightIntensity, req.body.decibels, req.body.startHour, req.body.finishHour);
    res.send("OK");
});

module.exports = router;
