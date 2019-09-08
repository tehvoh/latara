'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogCategory = sequelize.define('BlogCategory', {
    name: DataTypes.STRING
  }, {});
  BlogCategory.associate = function(models) {
    // associations can be defined here
    BlogCategory.belongsToMany(models.Blog, {
      through: 'BlogIdCategory',
      as: 'blogs',
      foreignKey: 'CategoryId'
    });
  };
  return BlogCategory;
};
