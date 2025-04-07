import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// WARNING: This is a fallback only - the actual Sequelize instance is created in user.model.ts
// We structure it this way to avoid circular dependencies
console.warn('NOTE: Using fallback database.ts - the primary sequelize instance is in models/user.model.ts');

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'massage_portal',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection initialized successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize; 