var express = require('express');
var router = express.Router();
const controllers = require('../controllers');
const models = require('../models');
const fs = require('fs');
var path = require('path');

//  form processing variables
var formidable = require('formidable'),
      http = require('http'),
      util = require('util');

/* GET users listing. */
router.get('/', function(req, res){
    controllers.blog.list().then((blogs) => res.status(200).send(blogs))
    .catch((error) => { res.status(400).send(error)
    });
  });

router.get('/new', function(req, res){
  res.render('newblog', {title: "Create new Blog", message: "Please enter both id and password"});
});

router.post('/new', function(req, res){
  if (req.url == '/new' && req.method.toLowerCase() == 'post') {

      // Instantiate a new formidable form for processing.

      var form = new formidable.IncomingForm();
      let headerName;
      fs.stat(path.join(__dirname, '../public/blog_headers'), function (err, stats){
        if (err) {
          // Directory doesn't exist or something.
          console.log('Folder doesn\'t exist, so I made the folder ');
          fs.mkdir(path.join(__dirname, '../public/blog_headers'), (err) => {
            if (err) throw err;
            console.log('Folder created!');
          });
        }else{
          console.log('Folder exists!');
        }
      });

      form.uploadDir = path.join(__dirname, '../public/blog_headers');
      // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.

      // rename file to it's original name
      form.on('file', function(field, file) {
        console.log(file);
        if(file){
          headerName = file.name;
          fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
            if (err) throw err;
            console.log('Rename complete!');
            console.log(field);
          });
        }else{
          console.log("File not found");
        }

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
      let name;
      try{
        name = fields.identifier.toLowerCase();
        console.log(name);
      }catch(err){
        console.log(err);
      }

        models.Blog.findOne({
          where:{ normalizedName: name}
        })
        .then((blog) => {
          //Dont recreate blog...redirect back with notification instead
          if(blog){
            // do your thang
            res.redirect('back');
          }

          const newBlog = {
            identifier: fields.identifier,
            normalizedName: name,
            header: headerName
          }

          if(fields.private && fields.private == 'on'){
            newBlog['private'] = true;
          }

          models.Blog.create(newBlog).then((newBlog) => {
            // newPost.addTag({
            //   name: fields.tag
            // })
            models.Tag.findOne({
              where:{name: fields.categories}
            }).then((tag) => {
              if(tag){
                tag.addBlog(newBlog)
              }else{
                models.Tag.create({name:fields.categories})
                .then((tag) => {
                  tag.addBlog(newBlog)
                }).catch((err) => {
                  console.log(err);
                })
              }
            }).catch((err) => {
              throw err
            });
            models.User.findOne({
              where:{id: req.session.lataraLogin.uuid}
            }).then((user) => {
              newBlog.setUser(user)
            }).catch((err) => {
              throw err
            });
            return res.redirect('/blog/'+newBlog.identifier);
          })



          console.log(newBlog);

        })
        .catch((err) => {
          throw err;
        });


    });
  }

});

router.get('/:identifier', function(req, res){
  controllers.blog.getBlog(req.params.identifier).then((blog) => {
    if(!blog){
        res.render('notfound', {title: "Blog", message: "Blog not found"})
    }else{
        res.render('viewblog', {title: blog.identifier, blog:blog})
    }
  })
})

module.exports = router;
