import { router } from 'expo-router';
import { useState } from 'react';

export type Mode = 'login' | 'register';

interface AuthFormState {
  email: string;
  password: string;
  isLoading: boolean;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
}

interface AuthFormActions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  clearErrors: () => void;
  validateForm: () => boolean;
  submitForm: () => Promise<void>;
  navigateToOtherMode: () => void;
}

export function useAuthForm(mode: Mode): AuthFormState & AuthFormActions {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<AuthFormState['errors']>({});

  const isLogin = mode === 'login';

  const clearErrors = () => {
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: AuthFormState['errors'] = {};
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'E-posta adresi gerekli';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Şifre gerekli';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalı';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (): Promise<void> => {
    // Clear previous errors
    clearErrors();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: API çağrısı
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // başarılıysa -> router.replace('/(tabs)');
      console.log(`${isLogin ? 'Login' : 'Register'} successful`);
      
    } catch (error) {
      setErrors({ general: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToOtherMode = () => {
    router.push(isLogin ? '/onboarding/register' : '/onboarding/login');
  };

  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  return {
    // State
    email,
    password,
    isLoading,
    errors,
    
    // Actions
    setEmail: handleSetEmail,
    setPassword: handleSetPassword,
    clearErrors,
    validateForm,
    submitForm,
    navigateToOtherMode,
  };
}
