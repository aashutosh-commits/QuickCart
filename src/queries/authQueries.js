import { useMutation } from '@tanstack/react-query';
import authService from '../api/services/authService';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/slices/authSlice';

export const useSendOTP = () => {
  return useMutation({
    mutationFn: (phoneNumber) => authService.sendOTP(phoneNumber),
  });
};

export const useVerifyOTP = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (accessToken) => authService.verifyOTP(accessToken),
    onSuccess: (data) => {
      if (data.status === 'success') {
        dispatch(setAuth({ user: data.data.user, token: data.token }));
      }
    },
  });
};
