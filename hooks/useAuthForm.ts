import { router } from 'expo-router';
import { useState } from 'react';
import { ERROR_MESSAGES } from '../constants/error';

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

  const clearErrors = () => setErrors({});

  const validateForm = (): boolean => {
    const newErrors: AuthFormState['errors'] = {};

    if (!email.trim()) newErrors.email = ERROR_MESSAGES.AUTH.REQUIRED_EMAIL;
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = ERROR_MESSAGES.AUTH.INVALID_EMAIL;

    if (!password.trim()) newErrors.password = ERROR_MESSAGES.AUTH.REQUIRED_PASSWORD;
    else if (password.length < 6)
      newErrors.password = ERROR_MESSAGES.AUTH.SHORT_PASSWORD;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (): Promise<void> => {
    clearErrors();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const demoEmail = 'demo@example.com';
      const demoPassword = '123456';

      if (email === demoEmail && password === demoPassword) {
        console.log(`${isLogin ? 'Login' : 'Register'} successful`);
        router.replace('/(tabs)');
      } else {
        setErrors({
          general: isLogin
            ? ERROR_MESSAGES.AUTH.WRONG_CREDENTIALS
            : ERROR_MESSAGES.AUTH.DUPLICATE_EMAIL,
        });
      }
    } catch {
      setErrors({ general: ERROR_MESSAGES.GENERAL.UNKNOWN });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToOtherMode = () =>
    router.push(isLogin ? '/onboarding/register' : '/onboarding/login');

  const handleSetEmail = (val: string) => {
    setEmail(val);
    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
  };

  const handleSetPassword = (val: string) => {
    setPassword(val);
    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
  };

  return {
    email,
    password,
    isLoading,
    errors,
    setEmail: handleSetEmail,
    setPassword: handleSetPassword,
    clearErrors,
    validateForm,
    submitForm,
    navigateToOtherMode,
  };
}
