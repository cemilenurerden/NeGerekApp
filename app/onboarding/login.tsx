// app/onboarding/login.tsx
import { router, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Login() {
  const navState = useRootNavigationState();
  const isReady = !!navState?.key;

  useEffect(() => {
    if (!isReady) return;
    router.replace('/onboarding/register');
  }, [isReady]);
  if (!isReady) return <View style={{ flex: 1 }} />;

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-2xl font-bold'>Giriş Yap</Text>
    </View>
  );
}

