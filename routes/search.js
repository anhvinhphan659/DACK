var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var searchTitle = req.query.title;
    res.render('search', { title: "NoName", searchtitle: searchTitle, });
});

module.exports = router;