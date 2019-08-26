var express = require('express');
var router = express.Router();

/* GET new post page. */
router.get('/new', function(req, res, next) {
  res.render('createpost', { title: 'New post' });
});

/* save new post. */
router.post('/new', function(req, res, next) {
  res.send('Post title:'+req.body.title );
});

module.exports = router;
