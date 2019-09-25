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
        required:false,
        attributes:['identifier']
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
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
