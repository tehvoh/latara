var express = require('express');
const db = require('../db')
var router = express.Router();
var path = require('path');
var fs = require('fs');
const models = require('../models');
const controllers = require('../controllers');


//Connection string

function insert(query, values){

}



//  form processing variables
var formidable = require('formidable'),
      http = require('http'),
      util = require('util');
/* GET new post page. */
router.get('/', function(req, res, next) {
  //console.log(req.session);
  controllers.post.list().then((posts) => res.render('posts', { title: 'Discover'}))

});
/* GET new post page. */
router.get('/new', function(req, res, next) {
  res.render('createpost', { title: 'New post',  posturl: '/new'  });
});

/* GET new post page. */
router.get('/:id/new', function(req, res, next) {
  req.session.blog = req.params.id;
  res.render('createpost', { title: 'New post', posturl: '#{:id}/new' });
});

/* save new post. */
router.post('/new', function(req, res, next) {

  if (req.url == '/new' && req.method.toLowerCase() == 'post') {

      // Instantiate a new formidable form for processing.

      var form = new formidable.IncomingForm();
      let headerName;
      fs.stat(path.join(__dirname, '../public/post_headers'), function (err, stats){
        if (err) {
          // Directory doesn't exist or something.
          console.log('Folder doesn\'t exist, so I made the folder ');
          fs.mkdir(path.join(__dirname, '../public/post_headers'), (err) => {
            if (err) throw err;
            console.log('Folder created!');
          });
        }else{
          console.log('Folder exists!');
        }
      });

      form.uploadDir = path.join(__dirname, '../public/post_headers');
      // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.

      // rename file to it's orignal name
      form.on('file', function(field, file) {
        console.log(file);
        headerName = file.name;
        fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
          if (err) throw err;
          console.log('Rename complete!');
          console.log(field);
        });
      });

        // log upload any errors that occur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });  // once all the files have been uploaded, send a response to the client

      form.parse(req, function(err, fields, files) {
        if (err) {
          // Check for and handle any errors here.
          console.error(err.message);
          return;
        }


        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received upload:\n\n');

        // This last line responds to the form submission with a list of the parsed data and files.
      //  util.inspect({fields: fields, files: files});

      //Check if similar post exists. If none exists create post
        models.Post.findOne({
          where:{ title:fields.title, UserId: req.session.lataraLogin.uuid}
        })
        .then((post) => {
          //Dont recreate post...update it instead
          if(post){

          }

          //new post object
          const newPost = {
            title: fields.title,
            body: fields.body,
            header: headerName
          }

          //Create post
          models.Post.create(newPost).then((newPost) => {
            // newPost.addTag({
            //   name: fields.tag
            // })
            //upon successful post creation, add tags
            models.Tag.findOne({
              where:{name: fields.tags}
            }).then((tag) => {
              if(tag){
                newPost.addTag(tag)
              }else{
                models.Tag.create({name:fields.tags})
                .then((tag) => {
                  newPost.addTag(tag)
                }).catch((err) => {
                  console.log(err);
                })
              }
            }).catch((err) => {
              throw err
            });

            //add user to post
            models.User.findOne({
              where:{id: req.session.lataraLogin.uuid}
            }).then((user) => {
              newPost.setUser(user)
            }).catch((err) => {
              throw err
            });

            //add blog to post if its a blog post
            if(req.session.blog){
              models.Blog.findOne({
                where:{id: req.session.blog}
              }).then((blog) => {
                newPost.setBlog(blog)
              }).catch((err) => {
                throw err
              });
            }

            req.session.blog = null;

            return res.redirect('/posts');
          })




          console.log(newPost);

        })
        .catch((err) => {
          throw err;
        });


    });
  }

});

/* GET new post page. */
router.get('/:id', function(req, res, next) {
  controllers.post.getPostById(req, res)
  .then((post) => {
    if(!post)
      res.render('notfound', {message: "Ooops! The post you requested could not be found!"});
    console.log(post);
    res.render('viewstory', { title: post.title, body: post.body });
  })
  .catch((err) => {
    console.log(err);
  });
});
module.exports = router;
