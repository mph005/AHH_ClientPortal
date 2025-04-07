import app from './app';
import dotenv from 'dotenv';
import { sequelize } from './models/index';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database models (in development only)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized.');
    }
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

// Run the server
startServer(); 