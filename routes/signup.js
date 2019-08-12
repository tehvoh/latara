var express = require('express');
var router = express.Router();

/*Execute sign up. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});

module.exports = router;
