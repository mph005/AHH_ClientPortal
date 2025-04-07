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
import { validateRequest } from '../middleware/validation.middleware';

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
    body('userId').optional().isInt().withMessage('User ID must be an integer'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('firstName').optional().isString().withMessage('First name must be a string'),
    body('lastName').optional().isString().withMessage('Last name must be a string'),
    body('phone').optional().isString().withMessage('Phone must be a string'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('state').optional().isString().withMessage('State must be a string'),
    body('zipCode').optional().isString().withMessage('Zip code must be a string'),
    body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('emergencyContactName').optional().isString().withMessage('Emergency contact name must be a string'),
    body('emergencyContactPhone').optional().isString().withMessage('Emergency contact phone must be a string'),
    body('notes').optional({ nullable: true, checkFalsy: false }).isString().withMessage('Notes must be a string')
  ],
  validateRequest,
  createClient
);

// Update client
router.put(
  '/:id',
  authenticate,
  [
    body('firstName').optional().isString().withMessage('First name must be a string'),
    body('lastName').optional().isString().withMessage('Last name must be a string'),
    body('phone').optional().isString().withMessage('Phone must be a string'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('state').optional().isString().withMessage('State must be a string'),
    body('zipCode').optional().isString().withMessage('Zip code must be a string'),
    body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('emergencyContactName').optional().isString().withMessage('Emergency contact name must be a string'),
    body('emergencyContactPhone').optional().isString().withMessage('Emergency contact phone must be a string'),
    body('notes').optional({ nullable: true, checkFalsy: false }).isString().withMessage('Notes must be a string')
  ],
  validateRequest,
  updateClient
);

// Delete client - only for therapist/admin
router.delete('/:id', authenticate, deleteClient);

export default router; 