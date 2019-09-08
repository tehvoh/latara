'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posttag = sequelize.define('Posttag', {
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  Posttag.associate = function(models) {
    // associations can be defined here
  };
  return Posttag;
};