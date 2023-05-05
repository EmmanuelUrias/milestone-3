'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      user_name: 'First User',
      password: '1234',
      email: 'fakeperson@example.com',
      budget: 3000,
      time_stamp: '04-21-2023'
    }, {
      user_name: 'Second User',
      password: '1234',
      email: 'secondfakeperson@example.com',
      budget: 3000,
      time_stamp: new Date
    }])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})

  }
};
