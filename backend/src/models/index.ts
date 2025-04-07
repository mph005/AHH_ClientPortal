import User, { sequelize } from './user.model';
import Client from './client.model';
import Service from './service.model';
import Appointment from './appointment.model';

// Export all models and sequelize instance
export {
  sequelize,
  User,
  Client,
  Service,
  Appointment
};

export default {
  sequelize,
  User,
  Client,
  Service,
  Appointment
}; 