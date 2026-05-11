import apiClient from './axios';

export const setupInterceptors = (store) => {
  // Request Interceptor
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      if (response) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          // Clear local storage and redirect or dispatch logout
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }

        // Centralized error message handling
        const message = response.data?.message || 'Something went wrong';
        console.error(`API Error [${response.status}]:`, message);
      } else {
        console.error('Network Error:', error.message);
      }

      return Promise.reject(error);
    }
  );
};
