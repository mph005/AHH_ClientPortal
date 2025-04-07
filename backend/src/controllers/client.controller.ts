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
    console.log('-----------------------------------------------------');
    console.log('POST /clients endpoint hit', new Date().toISOString());
    console.log('Creating client with data:', req.body);
    
    const {
      userId,
      email,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      notes
    } = req.body;
    
    // If userId is provided, check if user exists
    if (userId) {
      console.log('userId provided, checking if user exists:', userId);
      const user = await User.findByPk(userId);
      if (!user) {
        console.log('User not found with ID:', userId);
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      // Only allow admin to create client for other users
      if (userId !== req.userId && req.user?.role !== 'admin') {
        console.log('Authorization failed: user trying to create client for another user');
        console.log(`Requesting user: ${req.userId}, Target userId: ${userId}, Role: ${req.user?.role}`);
        res.status(403).json({ message: 'Not authorized to create client for this user' });
        return;
      }
      
      // Check if client already exists for this user
      const existingClientByUserId = await Client.findOne({ where: { userId } });
      if (existingClientByUserId) {
        console.log('Client already exists for this user:', existingClientByUserId.id);
        res.status(400).json({ message: 'Client profile already exists for this user' });
        return;
      }
    } else {
      console.log('No userId provided, creating client without user association');
    }
    
    // Check if client with this email already exists
    console.log('Checking if client with email already exists:', email);
    const existingClientByEmail = await Client.findOne({ where: { email } });
    if (existingClientByEmail) {
      console.log('Client with this email already exists:', existingClientByEmail.id);
      res.status(400).json({ message: 'Client with this email already exists' });
      return;
    }
    
    console.log('All validation passed, creating new client record');
    console.log('Date of birth value:', dateOfBirth, typeof dateOfBirth);
    
    // Create the client
    try {
      // Prepare the client data
      const clientData: any = {
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zipCode: zipCode || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        emergencyContactName: emergencyContactName || null,
        emergencyContactPhone: emergencyContactPhone || null,
        notes: notes || null,
        userId: null // Explicitly set userId to null
      };
      
      // Only add userId if it's provided with a value
      if (userId) {
        clientData.userId = userId;
      }
      
      console.log('Creating client with prepared data:', clientData);
      
      const client = await Client.create(clientData);
      
      console.log('Client created successfully with ID:', client.id);
      
      res.status(201).json({
        message: 'Client created successfully',
        client
      });
      console.log('Response sent, client creation complete');
    } catch (createError: any) {
      console.error('Error in Client.create():', createError);
      console.error('Error details:', JSON.stringify(createError, null, 2));
      res.status(500).json({ 
        message: 'Error creating client', 
        error: process.env.NODE_ENV === 'development' ? createError.message : undefined 
      });
      return;
    }
    
    console.log('-----------------------------------------------------');
  } catch (error: any) {
    console.error('ERROR in createClient:', error);
    console.error('Error stacktrace:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    next(error);
  }
};

// Update client
export const updateClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('-----------------------------------------------------');
    console.log('PUT /clients/:id endpoint hit', new Date().toISOString());
    console.log('Request body:', req.body);
    
    const { id } = req.params;
    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      notes
    } = req.body;
    
    console.log('Extracted notes value:', notes);
    console.log('Notes type:', typeof notes);
    
    const client = await Client.findByPk(id);
    if (!client) {
      console.log('Client not found with ID:', id);
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Check authorization - only allow if client belongs to user or user is admin
    if (
      client.userId !== req.userId && 
      req.user?.role !== 'admin'
    ) {
      console.log('Authorization failed: user not allowed to update client');
      console.log(`Client userId: ${client.userId}, Request userId: ${req.userId}, User role: ${req.user?.role}`);
      res.status(403).json({ message: 'Not authorized to update this client' });
      return;
    }
    
    // Create update data object with explicit null handling for empty strings
    const updateData = {
      firstName: firstName !== undefined ? firstName : client.firstName,
      lastName: lastName !== undefined ? lastName : client.lastName,
      phone: phone !== undefined ? phone : client.phone,
      address: address !== undefined ? address : client.address,
      city: city !== undefined ? city : client.city,
      state: state !== undefined ? state : client.state,
      zipCode: zipCode !== undefined ? zipCode : client.zipCode,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : client.dateOfBirth,
      emergencyContactName: emergencyContactName !== undefined ? emergencyContactName : client.emergencyContactName,
      emergencyContactPhone: emergencyContactPhone !== undefined ? emergencyContactPhone : client.emergencyContactPhone,
      notes: notes !== undefined ? notes : client.notes // Explicitly handle notes
    };
    
    console.log('Update data:', updateData);
    
    // Update client
    try {
      await client.update(updateData);
      
      console.log('Client updated successfully');
      res.status(200).json({
        message: 'Client updated successfully',
        client
      });
    } catch (updateError: any) {
      console.error('Error updating client:', updateError);
      console.error('Error details:', JSON.stringify(updateError, null, 2));
      res.status(500).json({ 
        message: 'Error updating client', 
        error: process.env.NODE_ENV === 'development' ? updateError.message : undefined 
      });
    }
    console.log('-----------------------------------------------------');
  } catch (error: any) {
    console.error('ERROR in updateClient:', error);
    console.error('Error stacktrace:', error.stack);
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