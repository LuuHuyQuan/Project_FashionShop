export interface ApiError {
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_AUTH_URL || 'https://localhost:7264/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = 'Đã có lỗi xảy ra';
    try {
      const error = await response.json();
      message = error.message ?? error.title ?? message;
    } catch {
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt?: string;
  user: AuthUser;
  id?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await request<{
      id: number;
      fullName: string;
      email: string;
      phone: string;
      role: string;
      accessToken: string;
      refreshToken: string;
    }>('/Auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        phone: response.phone,
        role: response.role,
        status: 'active',
      },
    };
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await request<{
      id: number;
      fullName: string;
      email: string;
      phone: string;
      role: string;
      accessToken: string;
      refreshToken: string;
    }>('/Auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        phone: response.phone,
        role: response.role,
        status: 'active',
      },
    };
  },

  me: async (_accessToken: string): Promise<AuthUser> => {
    throw new Error('Not implemented');
  },
};
