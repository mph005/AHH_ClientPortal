'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('clients', 'userId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('clients', 'email', {
      type: Sequelize.STRING(100),
      allowNull: false,
      defaultValue: '',
      after: 'userId'
    });

    // Add an index on the email column
    await queryInterface.addIndex('clients', ['email'], {
      name: 'clients_email_idx',
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('clients', 'clients_email_idx');
    await queryInterface.removeColumn('clients', 'email');
    
    await queryInterface.changeColumn('clients', 'userId', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
}; 