import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

export default function Splash() {
  const navState = useRootNavigationState();
  const isReady = !!navState?.key;

  const goNext = async () => {
    try {
      const seen = (await AsyncStorage.getItem("onboardingSeen")) === "1";
      router.replace(seen ? "/(tabs)" : "/onboarding/welcome");
    } catch {
      router.replace("/onboarding/welcome");
    }
  };

  useEffect(() => {
    if (!isReady) return;

    // GIF’te “bitti” olayı yok; sabit bir bekleme süresi kullanıyoruz.
    const timer = setTimeout(() => {
      void goNext();
    }, 2500); // GIF sürene göre ayarla (ms)

    return () => clearTimeout(timer);
  }, [isReady]);

  return (
    <LinearGradient
      colors={["#FFE4E1","#DCDCDC"]} // çok daha belirgin gri gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require("../../assets/images/splashLogo.gif")}
        style={styles.gif}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", alignItems: "center",
  },
  gif: {
    width: "80%", height: "80%",
  },
});