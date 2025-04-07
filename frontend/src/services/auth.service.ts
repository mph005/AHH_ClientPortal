import api from './api';
import { User } from '../store/slices/authSlice';

// Login interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register interface
export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'admin' | 'therapist' | 'client';
}

// Login response
export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Authentication service
const AuthService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Register user
  register: async (userData: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<{ user: User }>('/auth/me');
    return response.data.user;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('token');
  },
};

export default AuthService; 