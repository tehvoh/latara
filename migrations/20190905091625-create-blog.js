'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identifier: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      normalizedName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      header: {
        type: Sequelize.STRING,
        allowNull: false
      },

      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Blogs');
  }
};
