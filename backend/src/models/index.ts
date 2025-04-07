import User from './user.model';
import Service from './service.model';
import Appointment, { initAppointmentAssociations } from './appointment.model';

// Initialize all model associations
const initializeAssociations = () => {
  initAppointmentAssociations();
  
  // Add more association initializations as needed
};

// Initialize associations
initializeAssociations();

export {
  User,
  Service,
  Appointment,
}; 