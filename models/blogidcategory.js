'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogIdCategory = sequelize.define('BlogIdCategory', {
    BlogId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {});
  BlogIdCategory.associate = function(models) {
    // associations can be defined here
  };
  return BlogIdCategory;
};