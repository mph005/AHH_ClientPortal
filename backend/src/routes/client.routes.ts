import express from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} from '../controllers/client.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { body } from 'express-validator';

const router = express.Router();

// Get all clients - only for therapist/admin
router.get('/', authenticate, getAllClients);

// Get client by ID
router.get('/:id', authenticate, getClientById);

// Create a new client
router.post(
  '/',
  authenticate,
  [
    body('userId').isInt().withMessage('User ID must be an integer'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('state').optional().isString().withMessage('State must be a string'),
    body('zipCode').optional().isString().withMessage('Zip code must be a string'),
    body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('emergencyContactName').optional().isString().withMessage('Emergency contact name must be a string'),
    body('emergencyContactPhone').optional().isString().withMessage('Emergency contact phone must be a string'),
    body('notes').optional().isString().withMessage('Notes must be a string')
  ],
  createClient
);

// Update client
router.put(
  '/:id',
  authenticate,
  [
    body('address').optional().isString().withMessage('Address must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('state').optional().isString().withMessage('State must be a string'),
    body('zipCode').optional().isString().withMessage('Zip code must be a string'),
    body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('emergencyContactName').optional().isString().withMessage('Emergency contact name must be a string'),
    body('emergencyContactPhone').optional().isString().withMessage('Emergency contact phone must be a string'),
    body('notes').optional().isString().withMessage('Notes must be a string')
  ],
  updateClient
);

// Delete client - only for therapist/admin
router.delete('/:id', authenticate, deleteClient);

export default router; 