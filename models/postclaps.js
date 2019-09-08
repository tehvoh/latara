'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostClaps = sequelize.define('PostClaps', {
  }, {});
  PostClaps.associate = function(models) {
    // associations can be defined here
    PostClaps.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });

    PostClaps.belongsTo(models.Post, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });
  };
  return PostClaps;
};
