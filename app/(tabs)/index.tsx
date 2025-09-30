// app/index.tsx
import { Redirect, useRootNavigationState } from 'expo-router';

export default function Index() {
  const ready = !!useRootNavigationState()?.key;
  if (!ready) return null;                // Router tamamen mount olana kadar bekle
  return <Redirect href="/onboarding/splash" />;  // İlk açılışta Splash sayfasına git
}
