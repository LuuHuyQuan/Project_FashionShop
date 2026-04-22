export interface ApiError {
  message: string;
}

const API_BASE_URL = 'http://localhost:5158/api';

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
      message = error.message ?? message;
    } catch {
      // ignore json parse error
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
  status: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AuthUser;
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
  register: (payload: RegisterPayload) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: LoginPayload) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  me: (accessToken: string) =>
    request<AuthUser>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
