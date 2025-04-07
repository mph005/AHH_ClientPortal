'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      // Check if phone column already exists
      const tableInfo = await queryInterface.describeTable('clients');
      if (!tableInfo.phone) {
        // Only add phone column if it doesn't exist
        await queryInterface.addColumn('clients', 'phone', {
          type: Sequelize.STRING(20),
          allowNull: true
        });
        console.log('Added phone column to clients table');
      } else {
        console.log('Phone column already exists in clients table');
      }
    } catch (error) {
      console.error('Error adding phone column:', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      // Check if phone column exists before removing
      const tableInfo = await queryInterface.describeTable('clients');
      if (tableInfo.phone) {
        await queryInterface.removeColumn('clients', 'phone');
        console.log('Removed phone column from clients table');
      } else {
        console.log('Phone column does not exist in clients table');
      }
    } catch (error) {
      console.error('Error removing phone column:', error);
      throw error;
    }
  }
};
