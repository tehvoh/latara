'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {

  }, {timestamps: false});
  Bookmark.associate = function(models) {
    // associations can be defined here
    Bookmark.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });

    Bookmark.belongsTo(models.Post, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });

  };
  return Bookmark;
};
