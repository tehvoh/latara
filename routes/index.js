var express = require('express');
var controllers = require('../controllers');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  controllers.post.getfirsttwenty(req, res, 0).then((posts) => res.render('posts', {title: 'Latara Community', posts: posts}))
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
