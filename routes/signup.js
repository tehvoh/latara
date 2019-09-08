var express = require('express');
var router = express.Router();
const User = require('../models').User;



/*Execute sign up. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up' });
});
/*Execute sign up. */
router.post('/', function(req, res, next) {
  if(!req.body.username || !req.body.password || !req.body.email){
      res.status("400");
      res.send("Invalid details!");
   } else {

     let username = req.body.username;
     let email = req.body.email;
     let password = req.body.password;
     User.create({ username: username, email: email, password: password })
       .then(() => User.findOrCreate({where: {username: username} }))
       .then(([user, created]) => {

         console.log(created)

         let sessionUser = {};
         sessionUser['uuid'] = user.id;
         sessionUser['uname'] = user.username;
         sessionUser['umail'] = user.email;
         req.session.lataraLogin = sessionUser;

         console.log(sessionUser)

         res.redirect('/posts');


         /*
         In this example, findOrCreate returns an array like this:
         [ {
             username: 'fnord',
             job: 'omnomnom',
             id: 2,
             createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
             updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
           },
           false
         ]
         The array returned by findOrCreate gets spread into its 2 parts by the array spread on line 3, and
         the parts will be passed as 2 arguments to the callback function beginning on line 69, which will
         then treat them as "user" and "created" in this case. (So "user" will be the object from index 0
         of the returned array and "created" will equal "false".)
         */
       });

   }});

module.exports = router;
