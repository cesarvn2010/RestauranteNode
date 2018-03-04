var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Home', docs: docs});
    res.render('layout');
    res.render('index');
});

module.exports = router;