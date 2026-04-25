import axios from 'axios';

export const catalogApi = axios.create({
  baseURL: import.meta.env.VITE_API_CATALOG_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_URL || 'https://localhost:7264/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ordering API
export const orderingApi = axios.create({
  baseURL: import.meta.env.VITE_API_ORDERING_URL || 'http://localhost:5003/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = authApi;

// Request interceptor to add auth token
const addAuthInterceptor = (apiInstance: ReturnType<typeof axios.create>) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          const response = await authApi.post('/auth/refresh', {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
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
