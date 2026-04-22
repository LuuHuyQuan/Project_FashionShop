import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, type AuthResponse, type AuthUser, type LoginPayload, type RegisterPayload } from '../lib/api';

interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

interface StoredAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AuthUser;
}

const STORAGE_KEY = 'fashionstore_auth';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredAuth = (): StoredAuth | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) as StoredAuth : null;
};

const saveAuth = (auth: AuthResponse) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
};

const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = getStoredAuth();
      if (!stored?.accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authApi.me(stored.accessToken);
        setUser(currentUser);
        setAccessToken(stored.accessToken);
        setRefreshToken(stored.refreshToken);
        saveAuth({ ...stored, user: currentUser });
      } catch {
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const applyAuth = useCallback((auth: AuthResponse) => {
    setUser(auth.user);
    setAccessToken(auth.accessToken);
    setRefreshToken(auth.refreshToken);
    saveAuth(auth);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const auth = await authApi.login(payload);
    applyAuth(auth);
  }, [applyAuth]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const auth = await authApi.register(payload);
    applyAuth(auth);
  }, [applyAuth]);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    clearAuth();
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!user && !!accessToken,
    isLoading,
    login,
    register,
    logout,
  }), [user, accessToken, refreshToken, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
