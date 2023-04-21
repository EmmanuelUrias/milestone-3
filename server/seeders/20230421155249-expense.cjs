'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Expenses', [{
      expense_name: 'Groceries',
      expense_amount: 55,
      expense_type: 'Food',
      user_id: 1,
      time_stamp: new Date
    }], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {})

  }
};
