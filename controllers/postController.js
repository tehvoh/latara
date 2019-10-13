const models = require('../models');


module.exports = {
  list(req, res) {
    return models.Post
    .findAll({
      include: [{
        model: models.User,
        required: false,
        attributes: ['id', 'username', 'email']
      }, {
        model: models.Blog,
        as: 'blog',
        required:false,
        attributes:['identifier']
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  },

  getfirsttwenty(req, res, start) {
    return models.Post
    .findAll({
      include: [{
        model: models.User,
        required: false,
        attributes: ['id', 'username', 'email']
      }, {
        model: models.Blog,
        as: 'blog',
        required:false,
        attributes:['identifier']
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: 10,
    });
  },

  getPostById(req, res){
      return models.Post
      .findOne({
        where: {id: req.params.id},
        include: [{
          model: models.User,
          required: true,
          attributes: ['username']
        }]
      });
    }


}
