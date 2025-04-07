import { DataTypes, Model, Optional } from 'sequelize';
import User, { sequelize } from './user.model';

// Define interface for Client attributes
export interface ClientAttributes {
  id: number;
  userId: number | null;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: Date;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define interface for Client creation attributes
export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {}

// Define Client model
class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id!: number;
  public userId!: number | null;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public dateOfBirth!: Date;
  public emergencyContactName!: string;
  public emergencyContactPhone!: string;
  public notes!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Client model
Client.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    emergencyContactName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    emergencyContactPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'clients',
    timestamps: true,
  }
);

// Setup associations
Client.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default Client; 