var express = require('express');
var router = express.Router();

/*Execute sign up. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});
/*Execute sign up. */
router.post('/', function(req, res, next) {
  res.send('email:'+req.body.email);
});

module.exports = router;
