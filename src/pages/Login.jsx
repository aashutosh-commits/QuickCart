import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import { useSendOTP, useVerifyOTP } from '../queries/authQueries';

export default function Login() {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  // TanStack Query Hooks
  const { mutate: sendOTP, isPending: isSendingOTP, error: sendOTPError } = useSendOTP();
  const { mutate: verifyOTP, isPending: isVerifyingOTP, error: verifyOTPError } = useVerifyOTP();

  const handleSendOTP = (e) => {
    if (e) e.preventDefault();
    if (phoneNumber.length < 10) return;

    sendOTP(`+91${phoneNumber}`, {
      onSuccess: () => setStep('otp'),
    });
  };

  const handleVerifyOTP = (e) => {
    if (e) e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 4) return;

    verifyOTP({ phoneNumber: `+91${phoneNumber}`, otp: otpString }, {
      onSuccess: (data) => {
        if (data.status === 'success') {
          navigate('/');
        }
      },
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value !== '' && index < 3) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
    if (e.key === 'Enter' && step === 'otp' && otp.join('').length === 4) {
      handleVerifyOTP();
    }
  };

  const error = sendOTPError?.response?.data?.message || verifyOTPError?.response?.data?.message;
  const loading = isSendingOTP || isVerifyingOTP;

  return (
    <div className="min-h-screen bg-background flex flex-col p-8">
      {/* Header / Logo */}
      <div className="flex justify-center mt-12 mb-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-primary p-4 rounded-[2rem] shadow-xl shadow-primary/20"
        >
          <ShoppingBag size={40} className="text-white" strokeWidth={2.5} />
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-3 text-center">
                <h1 className="text-on-surface font-poppins font-bold text-3xl tracking-tight">Welcome Back</h1>
                <p className="text-secondary font-inter text-sm leading-relaxed px-6">
                  Secure access to your QuickCart account
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-outline/5 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-on-surface font-poppins font-bold text-lg">Login or Sign Up</h2>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-secondary font-inter uppercase tracking-[0.2em] ml-1">Phone Number</label>
                    <div className="flex items-center bg-background border border-outline/10 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                      <span className="text-on-surface font-inter font-bold mr-3 border-r border-outline/10 pr-3">+91</span>
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="000 000 0000" 
                        className="flex-1 bg-transparent outline-none font-inter text-on-surface placeholder:text-outline/40"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendOTP()}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-destructive text-xs font-inter font-medium text-center">{error}</p>
                )}

                <button 
                  onClick={handleSendOTP}
                  disabled={loading || phoneNumber.length < 10}
                  className="w-full bg-primary py-5 rounded-2xl shadow-xl shadow-primary/20 text-white font-poppins font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Get Verification Code'}
                </button>
              </div>

              <p className="text-[11px] text-center text-secondary font-inter leading-relaxed px-8">
                By continuing, you agree to QuickCart's <br/>
                <span className="text-primary font-bold hover:underline cursor-pointer">Terms of Service</span> & <span className="text-primary font-bold hover:underline cursor-pointer">Privacy Policy</span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-3 text-center">
                <h1 className="text-on-surface font-poppins font-bold text-3xl tracking-tight">Verify OTP</h1>
                <p className="text-secondary font-inter text-sm leading-relaxed px-6">
                  Sent to <span className="text-on-surface font-bold">+91 {phoneNumber.slice(0,2)}•• ••• {phoneNumber.slice(-4)}</span>
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-outline/5 space-y-8">
                <div className="flex justify-between gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      name={`otp-${i}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="w-full aspect-square bg-background border border-outline/10 rounded-2xl flex items-center justify-center font-poppins font-bold text-2xl text-on-surface text-center focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-destructive text-xs font-inter font-medium text-center">{error}</p>
                )}

                <div className="space-y-4">
                  <button 
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.join('').length < 4}
                    className="w-full bg-primary py-5 rounded-2xl shadow-xl shadow-primary/20 text-white font-poppins font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Continue'}
                  </button>
                  <button 
                    onClick={() => handleSendOTP()}
                    className="w-full text-secondary font-inter font-bold text-sm hover:text-primary transition-colors py-2 disabled:opacity-50"
                    disabled={loading}
                  >
                    Resend code
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  setStep('phone');
                }}
                className="flex items-center justify-center gap-2 text-secondary font-inter font-bold text-sm hover:text-on-surface transition-colors w-full"
              >
                <ArrowLeft size={16} />
                Change Phone Number
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Badge */}
      <div className="pb-10 flex flex-col items-center gap-2">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/50 backdrop-blur-sm border border-outline/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
        >
          <div className="bg-primary/10 p-2 rounded-lg">
            <ShieldCheck size={18} className="text-primary" />
          </div>
          <span className="text-[10px] font-bold text-on-surface/60 tracking-wider uppercase">Bank-Grade Encryption</span>
        </motion.div>
      </div>
    </div>
  );
}


