'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Drop the existing foreign key constraint
    await queryInterface.sequelize.query(
      'ALTER TABLE `clients` DROP FOREIGN KEY `clients_ibfk_1`;'
    );
    
    // Recreate the foreign key constraint with proper NULL handling
    await queryInterface.sequelize.query(
      'ALTER TABLE `clients` MODIFY COLUMN `userId` INT UNSIGNED NULL;'
    );
    
    await queryInterface.sequelize.query(
      'ALTER TABLE `clients` ADD CONSTRAINT `clients_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;'
    );
  },

  async down (queryInterface, Sequelize) {
    // Revert changes by dropping and recreating the original constraint
    await queryInterface.sequelize.query(
      'ALTER TABLE `clients` DROP FOREIGN KEY `clients_userId_fkey`;'
    );
    
    await queryInterface.sequelize.query(
      'ALTER TABLE `clients` MODIFY COLUMN `userId` INT UNSIGNED NOT NULL;'
    );
    
    await queryInterface.sequelize.query(
      'ALTER TABLE `clients` ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;'
    );
  }
}; 