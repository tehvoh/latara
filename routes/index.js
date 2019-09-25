var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Latara Community' });
});
/* GET library page. */
router.get('/library', function(req, res, next) {
  if(!req.session.lataraLogin){
    res.render('index', { title: 'Latara Community' });
  } else {
    res.render('library', { title: 'My Library' });
  }
});

module.exports = router;
