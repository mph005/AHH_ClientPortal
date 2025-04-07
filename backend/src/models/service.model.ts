import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define interface for Service attributes
export interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define interface for Service creation attributes
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id' | 'active' | 'createdAt' | 'updatedAt'> {}

// Define Service model
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public duration!: number;
  public price!: number;
  public active!: boolean;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Service model
Service.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: 'Duration in minutes',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'services',
    timestamps: true,
  }
);

export default Service; 