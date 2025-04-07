import { DataTypes, Model, Optional } from 'sequelize';
import User, { sequelize } from './user.model';
import Service from './service.model';

// Define appointment status enum
export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show',
}

// Define interface for Appointment attributes
export interface AppointmentAttributes {
  id: number;
  clientId: number;
  serviceId: number;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define interface for Appointment creation attributes
export interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id' | 'endTime' | 'status' | 'notes' | 'createdAt' | 'updatedAt'> {}

// Define Appointment model
class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
  public id!: number;
  public clientId!: number;
  public serviceId!: number;
  public startTime!: Date;
  public endTime!: Date;
  public status!: AppointmentStatus;
  public notes!: string;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize Appointment model
Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
      allowNull: false,
      defaultValue: AppointmentStatus.PENDING,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'appointments',
    timestamps: true,
  }
);

// Define associations
Appointment.belongsTo(User, {
  foreignKey: 'clientId',
  as: 'client',
});

Appointment.belongsTo(Service, {
  foreignKey: 'serviceId',
  as: 'service',
});

export default Appointment; 