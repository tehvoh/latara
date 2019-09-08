const User = require('../models').User;
const Post = require('../models').Post;
const Blog = require('../models').Blog;


module.exports = {
  list(req, res) {
    return User
    .findAll({

      order: [
        ['createdAt', 'DESC'],
      ],
    })
    .then(users => res.status(200).send(users))
    .catch((error) => { res.status(400).send(error);
    });
  },

  getById(req, res) {
    return User
      .getById(req.params.id, {
        include: [{
          model: Post,
          as: 'post'
        }, {
          model: Blog,
          as: 'blogs'
        }],
      })
      .then((user) => {
        if(!user){
          return res.status(404).send({
           message: 'User Not Found',
         });
        }

        return res.status(200).send(student);
      }).catch((error) => res.status(400).send(error));
  },

  getByUsername(name) {
    return User
    .findOne({
      where: {
        username: name
      },
      attributes:[['id', 'uuid'], ['username', 'uname'], ['email', 'umail'], 'password' ]
    })
  },

  getByEmail(email) {
    return User
    .findOne({
      where: {
        email: email
      },
      attributes:[['id', 'uuid'], ['username', 'uname'], ['email', 'umail'], 'password' ]
    });

  },

  //Get details to store on session
  getSessionUser(email) {
    return User
    .findOne({
      where: {
        email: email
      },
      attributes:[['id', 'uuid'], ['username', 'uname'], ['email', 'umail']]
    });

  }
}
