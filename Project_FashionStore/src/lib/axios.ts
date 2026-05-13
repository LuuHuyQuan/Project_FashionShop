import axios from 'axios';

export const catalogApi = axios.create({
  baseURL: 'https://localhost:7002/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = axios.create({
  baseURL: 'https://localhost:7264/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ordering API
export const orderingApi = axios.create({
  baseURL: 'https://localhost:7298/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = authApi;

// Request interceptor to add auth token
const addAuthInterceptor = (apiInstance: ReturnType<typeof axios.create>) => {
  apiInstance.interceptors.request.use(
    (config) => {
      // Read from the correct storage key
      const authData = localStorage.getItem('fashionstore_auth');
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          const token = parsed.accessToken;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.error('Failed to parse auth data:', e);
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor to handle token refresh
const addRefreshInterceptor = (apiInstance: ReturnType<typeof axios.create>) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const authData = localStorage.getItem('fashionstore_auth');
          if (!authData) {
            throw new Error('No auth data');
          }

          const parsed = JSON.parse(authData);
          const refreshToken = parsed.refreshToken;

          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          const response = await authApi.post('/auth/refresh', {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken, user, expiresAt } = response.data;

          // Update the stored auth data
          const newAuthData = {
            accessToken,
            refreshToken: newRefreshToken,
            user,
            expiresAt
          };
          localStorage.setItem('fashionstore_auth', JSON.stringify(newAuthData));

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('fashionstore_auth');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

addAuthInterceptor(catalogApi);
addAuthInterceptor(authApi);
addAuthInterceptor(orderingApi);

addRefreshInterceptor(catalogApi);
addRefreshInterceptor(authApi);
addRefreshInterceptor(orderingApi);
