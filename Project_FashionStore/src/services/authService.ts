import { authApi } from '../lib/axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Address {
  id: number;
  userId: number;
  recipientName: string;
  phone: string;
  addressLine: string;
  city?: string;
  district?: string;
  ward?: string;
  isDefault: boolean;
}

export const authService = {
  // Authentication
  login: async (data: LoginRequest) => {
    const response = await authApi.post<AuthResponse>('/auth/login', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await authApi.post<AuthResponse>('/auth/register', data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser: async () => {
    const response = await authApi.get<User>('/auth/me');
    return response.data;
  },

  // Addresses
  getMyAddresses: async () => {
    const response = await authApi.get<Address[]>('/addresses/my-addresses');
    return response.data;
  },

  createAddress: async (data: Omit<Address, 'id' | 'userId'>) => {
    const response = await authApi.post<Address>('/addresses', data);
    return response.data;
  },

  updateAddress: async (id: number, data: Omit<Address, 'id' | 'userId'>) => {
    const response = await authApi.put<Address>(`/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: number) => {
    await authApi.delete(`/addresses/${id}`);
  },
};
