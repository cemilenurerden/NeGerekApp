import { BlurView } from 'expo-blur';
import { useRootNavigationState } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions, Image, KeyboardAvoidingView, Platform,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Mode, useAuthForm } from '../../hooks/useAuthForm';

// Constants
const DEFAULT_BACKGROUND_IMAGE = require('../../assets/images/buğday.jpg');
const HEADER_MARGIN_BOTTOM = 400;
const BLUR_INTENSITY = 15;

interface AuthScreenProps {
  mode: Mode;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  backgroundImage?: any;
  showSocialLogin?: boolean;
  showForgotPassword?: boolean;
}

// Default content based on mode
const getDefaultContent = (mode: Mode) => {
  const isLogin = mode === 'login';
  return {
    title: isLogin ? 'Kullanıcı Girişi' : 'Kayıt Ol',
    subtitle: isLogin ? 'Devam etmek için giriş yapın.' : 'E-posta ve şifre ile kayıt olun.',
    primaryLabel: isLogin ? 'Log In' : 'Sign Up',
    showForgotPassword: isLogin,
  };
};

export default function AuthScreen({ 
  mode, 
  title,
  subtitle,
  primaryLabel,
  backgroundImage,
  showSocialLogin = true,
  showForgotPassword
}: AuthScreenProps) {
  const navState = useRootNavigationState();
  const isReady = !!navState?.key;
  
  const authForm = useAuthForm(mode);
  const isLogin = mode === 'login';
  const defaults = getDefaultContent(mode);

  // Use provided values or defaults
  const content = {
    title: title || defaults.title,
    subtitle: subtitle || defaults.subtitle,
    primaryLabel: primaryLabel || defaults.primaryLabel,
    backgroundImage: backgroundImage || DEFAULT_BACKGROUND_IMAGE,
    showForgotPassword: showForgotPassword !== undefined ? showForgotPassword : defaults.showForgotPassword,
  };

  if (!isReady) return <View style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={content.backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <BlurView intensity={BLUR_INTENSITY} style={styles.blurOverlay} pointerEvents="none" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={[styles.textContainer, styles.header]}>
            <Text style={styles.text}>{content.title}</Text>
            <Text style={[styles.text, styles.text1]}>{content.subtitle}</Text>
          </View>

          <View style={styles.card}>
            {/* General Error */}
            {authForm.errors.general && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{authForm.errors.general}</Text>
              </View>
            )}

            <TextInput
              style={[styles.input, authForm.errors.email && styles.inputError]}
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.8)"
              value={authForm.email}
              onChangeText={authForm.setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              editable={!authForm.isLoading}
            />
            {authForm.errors.email && <Text style={styles.fieldError}>{authForm.errors.email}</Text>}

            <TextInput
              style={[styles.input, authForm.errors.password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.8)"
              value={authForm.password}
              onChangeText={authForm.setPassword}
              secureTextEntry
              returnKeyType="done"
              editable={!authForm.isLoading}
            />
            {authForm.errors.password && <Text style={styles.fieldError}>{authForm.errors.password}</Text>}

            {content.showForgotPassword && (
              <TouchableOpacity style={styles.forgotWrap} disabled>
                <Text style={styles.linkMuted}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.primaryBtn, authForm.isLoading && styles.primaryBtnDisabled]} 
              onPress={authForm.submitForm}
              disabled={authForm.isLoading}
            >
              {authForm.isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.primaryBtnText}>{content.primaryLabel}</Text>
              )}
            </TouchableOpacity>

            {showSocialLogin && (
              <>
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.socialBtn} disabled>
                  <Text style={styles.socialBtnText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtn} disabled>
                  <Text style={styles.socialBtnText}>Continue with Apple</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <Text style={styles.link} onPress={authForm.navigateToOtherMode}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  blurOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  backgroundImage: { position: 'absolute', top: 0, left: 0, width, height, zIndex: 0 },
  content: { minHeight: height, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'center', zIndex: 1 },
  textContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1, marginBottom: HEADER_MARGIN_BOTTOM },
  header: { flex: 0, marginBottom: 16 },
  text: { fontSize: 30, color: 'white', textAlign: 'center' },
  text1: { fontSize: 20, marginTop: 10 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.25)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  input: { height: 48, borderRadius: 12, paddingHorizontal: 14, backgroundColor: 'rgba(255,255,255,0.22)', color: '#fff' },
  forgotWrap: { alignSelf: 'flex-end', marginTop: -2, marginBottom: 8 },
  linkMuted: { color: 'rgba(255,255,255,0.9)' },
  primaryBtn: { height: 48, borderRadius: 24, backgroundColor: '#2ea5f4', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 10 },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.35)' },
  dividerText: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: 12 },
  socialBtn: { height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  socialBtnText: { color: '#fff', fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 6 },
  footerText: { color: 'rgba(255,255,255,0.9)' },
  link: { color: '#fff', fontWeight: '700', textDecorationLine: 'underline' },
  // Error styles
  errorContainer: { 
    backgroundColor: 'rgba(255, 0, 0, 0.1)', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)'
  },
  errorText: { color: '#ff6b6b', textAlign: 'center', fontSize: 14 },
  fieldError: { color: '#ff6b6b', fontSize: 12, marginTop: 4, marginBottom: 8 },
  inputError: { borderColor: '#ff6b6b', borderWidth: 1 },
  primaryBtnDisabled: { opacity: 0.7 },
});
