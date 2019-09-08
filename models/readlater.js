'use strict';
module.exports = (sequelize, DataTypes) => {
  const Readlater = sequelize.define('Readlater', {
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Readlater.associate = function(models) {
    // associations can be defined here
    Readlater.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: 'CASCADE'
    });

    Readlater.belongsTo(models.Post, {
      foreignKey: "PostId",
      onDelete: 'CASCADE'
    });

  };
  return Readlater;
};
