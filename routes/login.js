var express = require('express');
var router = express.Router();

/* execute login. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Latara Login' });
});

module.exports = router;
