'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    header: DataTypes.STRING,

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });

    Post.hasOne(models.BlogPost, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });

    Post.hasMany(models.Postcomment, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });

    Post.hasMany(models.Readlater, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });

    Post.belongsToMany(models.Tag, {
      through: 'Posttags',
      as: 'tags',
      foreignKey: 'PostId'
    });
  };
  return Post;
};
