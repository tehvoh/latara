'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Blog);
    User.hasMany(models.Post);

    User.belongsToMany(models.Post, {
      through: models.PostClaps,
      as: 'claps',
      foreignKey: 'UserId'
    });
  };
  return User;
};
