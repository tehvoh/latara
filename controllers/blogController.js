const models = require('../models');


module.exports = {
  list(req, res) {
    return models.Blog
    .findAll({
      include: [{
        model: models.User,
        required: false,
        attributes: ['id', 'username', 'email']
      }],
      order: [
        ['createdAt', 'DESC'],
      ],
    });

  },

  getBlog(name){
    return models.Blog
    .findOne({
      where: {normalizedName: name.toLowerCase()}
    });
  }
}
