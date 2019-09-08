'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here

      Tag.belongsToMany(models.Post, {
        through: 'Posttags',
        as: 'posts',
        foreignKey: 'TagId'
      });

      Tag.belongsToMany(models.Blog, {
        through: models.BlogIdCategory,
        as: 'blogs',
        foreignKey: 'CategoryId'
      });
  };
  return Tag;
};
