var express = require('express');
var router = express.Router();

/*get welcome page*/
router.get('/', function(req, res, next) {
  res.render('welcome page', { title: 'welcome page' });
});

module.exports = router;