import { useState, useEffect } from 'react';
import { authService, type User } from '../services';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authService.getCurrentUser();
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
        console.error('Error fetching user:', err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });
      setUser({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, error, login, logout };
};
