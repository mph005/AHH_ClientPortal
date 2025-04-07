'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add firstName column
    await queryInterface.addColumn('clients', 'firstName', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'email'
    });
    
    // Add lastName column
    await queryInterface.addColumn('clients', 'lastName', {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: 'firstName'
    });
    
    // Add phone column
    await queryInterface.addColumn('clients', 'phone', {
      type: Sequelize.STRING(20),
      allowNull: true,
      after: 'lastName'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the added columns
    await queryInterface.removeColumn('clients', 'firstName');
    await queryInterface.removeColumn('clients', 'lastName');
    await queryInterface.removeColumn('clients', 'phone');
  }
};
