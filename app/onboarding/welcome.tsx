// app/onboarding/welcome.tsx
import { BlurView } from 'expo-blur';
import { router, useRootNavigationState } from 'expo-router';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

export default function Welcome() {
  const navState = useRootNavigationState();
  const isReady = !!navState?.key;


  if (!isReady) return <View style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* Arka plan resmi */}
      <Image
        source={require('../../assets/images/modelResmi.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Bulanık overlay */}
      <BlurView intensity={15} style={styles.blurOverlay} pointerEvents="none" />
      
      {/* İçerik alanı */}
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Hoş Geldiniz</Text>
        <Text style={[styles.welcomeText, styles.welcomeTextSubtitle]}>NeGerek ile dolabını dijitalleştir, alışverişini bilinçli yap!</Text>
      </View>

      <View style={styles.continue}>
        <Button title="Devam et"
        color="#ffffff"
        onPress={() => router.push('/onboarding/login')} />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  blurOverlay: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  welcomeText: {
    fontSize: 32,
    fontStyle: 'italic',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  welcomeTextSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  continue:{
    alignItems:'flex-end',
    marginBottom:50,
    marginRight:20,
    zIndex:1
  },
});
