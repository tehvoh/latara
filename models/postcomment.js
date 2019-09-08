'use strict';
module.exports = (sequelize, DataTypes) => {
  const Postcomment = sequelize.define('Postcomment', {
    comment: DataTypes.STRING
  }, {});
  Postcomment.associate = function(models) {
    // associations can be defined here
    Postcomment.belongsTo(models.Post, {
      foreignKey: 'PostId',
      onDelete: 'CASCADE'
    });

    Postcomment.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    })
  };
  return Postcomment;
};
