'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('goal', {
      goal_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      goal_amount: {
        type:Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'user',
            schema: 'public'
          },
          key: 'user_id'
        }
      },
      time_stamp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('goal');
  }
};
