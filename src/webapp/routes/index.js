var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET the lightning home page */
router.get('/home', function(req, res, next){
  res.render('home', {title: 'Lightning'});
});

/* POST request for the form */
router.post('/home', function(req, res, next){
    console.log('Username:' + req.body.username);
    console.log('Password: ' + req.body.password);
    return;
});

module.exports = router;
