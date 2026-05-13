import apiClient from '../axios';

const authService = {
  sendOTP: async (phoneNumber) => {
    const response = await apiClient.post('/auth/send-otp', { phoneNumber });
    return response.data;
  },
  verifyOTP: async (accessToken) => {
    const response = await apiClient.post('/auth/verify-otp', { accessToken });
    return response.data;
  },
  // Add other auth methods like refreshToken here if needed
};

export default authService;
