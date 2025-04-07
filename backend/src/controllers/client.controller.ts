import { Request, Response, NextFunction } from 'express';
import Client from '../models/client.model';
import User from '../models/user.model';

// Get all clients (for admin only)
export const getAllClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('-----------------------------------------------------');
    console.log('GET /clients endpoint hit', new Date().toISOString());
    console.log('User requesting clients:', { 
      userId: req.userId, 
      role: req.user?.role,
      email: req.user?.email,
      firstName: req.user?.firstName,
      lastName: req.user?.lastName
    });
    
    // Only admins can see all clients
    if (req.user?.role !== 'admin') {
      console.log('Authorization failed: user is not admin');
      console.log(`User role is: ${req.user?.role}`);
      res.status(403).json({ message: 'Not authorized to view all clients' });
      return;
    }
    
    console.log('User is authorized. Querying database for clients...');
    console.log('Checking DB connection status...');
    try {
      await Client.sequelize?.authenticate();
      console.log('Database connection is OK');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
    }
    
    console.log('Executing query with User association...');
    const clients = await Client.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'active'],
        }
      ]
    });
    
    console.log(`Found ${clients.length} clients in database`);
    
    if (clients.length === 0) {
      console.log('No clients found in the database');
    } else {
      console.log('First client data (sample):', JSON.stringify(clients[0], null, 2));
    }
    
    res.status(200).json({ clients });
    console.log('Response sent successfully');
    console.log('-----------------------------------------------------');
  } catch (error) {
    console.error('ERROR in getAllClients:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    next(error);
  }
};

// Get client by ID
export const getClientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    const client = await Client.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'active'],
        }
      ]
    });
    
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check authorization - only allow if client belongs to user or user is admin
    if (
      client.userId !== req.userId && 
      req.user?.role !== 'admin'
    ) {
      res.status(403).json({ message: 'Not authorized to view this client' });
      return;
    }
    
    res.status(200).json({ client });
  } catch (error) {
    next(error);
  }
};

// Create a new client
export const createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      userId,
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      notes
    } = req.body;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Only allow admin to create client for other users
    if (userId !== req.userId && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to create client for this user' });
      return;
    }
    
    // Check if client already exists for this user
    const existingClient = await Client.findOne({ where: { userId } });
    if (existingClient) {
      res.status(400).json({ message: 'Client profile already exists for this user' });
      return;
    }
    
    const client = await Client.create({
      userId,
      address,
      city,
      state,
      zipCode,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      emergencyContactName,
      emergencyContactPhone,
      notes
    });
    
    res.status(201).json({
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    next(error);
  }
};

// Update client
export const updateClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      notes
    } = req.body;
    
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check authorization - only allow if client belongs to user or user is admin
    if (
      client.userId !== req.userId && 
      req.user?.role !== 'admin'
    ) {
      res.status(403).json({ message: 'Not authorized to update this client' });
      return;
    }
    
    // Update client
    await client.update({
      address,
      city,
      state,
      zipCode,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : client.dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      notes
    });
    
    res.status(200).json({
      message: 'Client updated successfully',
      client
    });
  } catch (error) {
    next(error);
  }
};

// Delete client
export const deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check authorization - only allow if client belongs to user or user is admin
    if (
      client.userId !== req.userId && 
      req.user?.role !== 'admin'
    ) {
      res.status(403).json({ message: 'Not authorized to delete this client' });
      return;
    }
    
    await client.destroy();
    
    res.status(200).json({
      message: 'Client deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 