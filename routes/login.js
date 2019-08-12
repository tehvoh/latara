var express = require('express');
var router = express.Router();

/* execute login. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Latara Login' });
});

router.post('/', function(req, res, next){
  res.send("email: "+req.body.email+" password: "+req.body.password);
});

module.exports = router;
