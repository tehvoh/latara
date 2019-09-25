'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    identifier: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    normalizedName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    header: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
    Blog.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });

    Blog.hasMany(models.Post, {
      as: 'posts',
    });

    Blog.belongsToMany(models.Tag, {
      through: models.BlogIdCategory,
      as: 'categories',
      foreignKey: 'BlogId'
    });


  };
  return Blog;
};
