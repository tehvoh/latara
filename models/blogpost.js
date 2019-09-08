'use strict';
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
  }, {timestamps: false});
  BlogPost.associate = function(models) {
    // associations can be defined here
    BlogPost.belongsTo(models.Post, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });

    BlogPost.belongsTo(models.Blog, {
      foreignKey: "BlogId",
      onDelete: 'CASCADE'
    });

  };
  return BlogPost;
};
