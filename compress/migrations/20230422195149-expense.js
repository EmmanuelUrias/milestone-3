'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('expense', {
      expense_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      expense_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expense_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      expense_type: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('expense');
  }
};
