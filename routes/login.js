var express = require('express');
var router = express.Router();
const User = require('../models').User;

const userController = require('../controllers').user;
/* execute login. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Latara Login' });
});

router.post('/', function(req, res, next){
  if(!req.body.login || !req.body.password){
     res.render('login', {message: "Please enter both id and password"});
  } else {
     userController.getByUsername(req.body.login)
     .then((user) => {
       if(!user){

         res.render('login', {message: "That account is not registered!"});
       }


      if(user.password === req.body.password){
      //  user.removeAttribute(attribute: ['password']);
        sessionUser =  user.toJSON();
        delete sessionUser.password;
        req.session.lataraLogin = sessionUser;
        res.redirect('/posts');
      }else{
        res.render('login', {message: "Invalid credentials!"});
      }


    }).catch((error) =>{console.log(error);});


  }
});


module.exports = router;
