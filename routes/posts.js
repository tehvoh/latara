var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('posts', { title: 'All posts' });
});

module.exports = router;
