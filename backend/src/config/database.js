require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'massage_portal',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT || '3306', 10),
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'massage_portal_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.TEST_DB_PORT || '3306', 10),
  },
  production: {
    username: process.env.PROD_DB_USER || 'root',
    password: process.env.PROD_DB_PASSWORD || '',
    database: process.env.PROD_DB_NAME || 'massage_portal_prod',
    host: process.env.PROD_DB_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.PROD_DB_PORT || '3306', 10),
  }
}; 