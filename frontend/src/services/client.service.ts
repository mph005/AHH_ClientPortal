import api from './api';

// Client interfaces
export interface Client {
  id: number;
  userId: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: string;
    active: boolean;
  };
}

export interface ClientFormData {
  userId: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

// Client service
const ClientService = {
  // Get all clients (therapist/admin only)
  getAllClients: async (): Promise<Client[]> => {
    try {
      console.log('ClientService: Fetching all clients...');
      
      // Check if token exists (debugging)
      const token = localStorage.getItem('token');
      console.log('ClientService: Auth token exists:', !!token);
      if (token) {
        console.log('ClientService: First few chars of token:', token.substring(0, 10) + '...');
      }
      
      const response = await api.get<{ clients: Client[] }>('/clients');
      console.log('ClientService: API Response status:', response.status);
      console.log('ClientService: Full response data:', JSON.stringify(response.data, null, 2));
      
      // Check the structure of the response
      if (!response.data || !response.data.clients) {
        console.warn('ClientService: Unexpected API response format:', response.data);
        return [];
      }

      console.log(`ClientService: Found ${response.data.clients?.length || 0} clients`);
      return response.data.clients || [];
    } catch (error: any) {
      console.error('ClientService: Error in getAllClients:', error);
      console.error('ClientService: Error response:', error.response?.data);
      console.error('ClientService: Error status:', error.response?.status);
      console.error('ClientService: Error message:', error.message);
      throw error;
    }
  },

  // Get client by ID
  getClientById: async (id: number): Promise<Client> => {
    try {
      console.log(`Fetching client with ID: ${id}`);
      const response = await api.get<{ client: Client }>(`/clients/${id}`);
      console.log('API Response:', response.data);
      return response.data.client;
    } catch (error) {
      console.error(`Error in getClientById(${id}):`, error);
      throw error;
    }
  },

  // Create a new client
  createClient: async (clientData: ClientFormData): Promise<Client> => {
    try {
      console.log('Creating new client with data:', clientData);
      const response = await api.post<{ client: Client, message: string }>('/clients', clientData);
      console.log('API Response:', response.data);
      return response.data.client;
    } catch (error) {
      console.error('Error in createClient:', error);
      throw error;
    }
  },

  // Update client
  updateClient: async (id: number, clientData: Partial<ClientFormData>): Promise<Client> => {
    try {
      console.log(`Updating client ${id} with data:`, clientData);
      const response = await api.put<{ client: Client, message: string }>(`/clients/${id}`, clientData);
      console.log('API Response:', response.data);
      return response.data.client;
    } catch (error) {
      console.error(`Error in updateClient(${id}):`, error);
      throw error;
    }
  },

  // Delete client (therapist/admin only)
  deleteClient: async (id: number): Promise<void> => {
    try {
      console.log(`Deleting client with ID: ${id}`);
      await api.delete(`/clients/${id}`);
      console.log('Client deleted successfully');
    } catch (error) {
      console.error(`Error in deleteClient(${id}):`, error);
      throw error;
    }
  },
};

export default ClientService; 