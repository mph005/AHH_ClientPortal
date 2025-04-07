import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a direct Sequelize instance within this file to avoid circular dependencies
const dbName = process.env.DB_NAME || 'massage_portal';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

// Define interface for User attributes
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: 'admin' | 'client';
  firstName: string;
  lastName: string;
  phone?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define interface for User creation attributes
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'active' | 'createdAt' | 'updatedAt'> {}

// Define User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'client';
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public active!: boolean;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  // Define additional methods
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return require('bcrypt').compare(candidatePassword, this.password);
  }
}

// Initialize User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'client'),
      allowNull: false,
      defaultValue: 'client',
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          const bcrypt = require('bcrypt');
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const bcrypt = require('bcrypt');
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// Export both the User model and the sequelize instance
export { sequelize };
export default User; 