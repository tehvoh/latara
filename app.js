var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')

//Routers: route holders
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var postsRouter = require('./routes/posts');
var blogsRouter = require('./routes/blogs');
const controllers = require('./controllers');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
  name: 'lataraLogin',
  keys: ['uuid', 'uname', 'umail']
}));

app.use(cookieSession({
  name: 'blogPost',
  keys: ['uuid']
}));

app.use(function (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
  next()
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/awesome', express.static('public/fontawesome'))

app.get('*', function(req, res, next) {
  // just use boolean for loggedIn
  res.locals.loggedIn = (req.session) ? true : false;
  next();

});
app.use('/', indexRouter);
app.use('/login', ifSignedIn, loginRouter);
app.use('/signup', signupRouter);
app.use('/posts', postsRouter);
app.use('/users',checkSignIn, usersRouter);
app.use('/blog',checkSignIn, blogsRouter);

app.get('/logout', function(req, res){
  req.session = null;

  console.log("user logged out.")

  res.redirect('/login');
});

app.get('/discover', function(req, res){
  controllers.blog.list().then((blogs) => res.status(200).send(blogs))
  .catch((error) => { res.status(400).send(error)
  });
});

app.get('/profile', checkSignIn, function(req, res){
  controllers.user.getProfile(req, res);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function checkSignIn(req, res, next){
   if(req.session.lataraLogin){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      res.redirect('/login');
      next(err);  //Error, trying to access unauthorized page!
   }
}

function ifSignedIn(req, res, next){
   if(req.session.lataraLogin){
     res.redirect('/posts');
   } else {
      next();  //Error, trying to access unauthorized page!
   }
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
