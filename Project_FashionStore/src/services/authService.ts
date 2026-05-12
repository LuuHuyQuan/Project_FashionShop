import { authApi } from '../lib/axios';

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

export interface UpdateUserRequest {
  fullName: string;
  phone: string;
  role: string;
  status: string;
}

export const authService = {
  // Users management
  getUsers: async () => {
    const response = await authApi.get<User[]>('/users');
    return response.data;
  },

  getUserById: async (id: number) => {
    const response = await authApi.get<User>(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, data: UpdateUserRequest) => {
    const response = await authApi.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await authApi.delete(`/users/${id}`);
    return response.data;
  },
};
