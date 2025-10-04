import AuthScreen from '../../components/auth/AuthScreen';

export default function Login() {
  return (
    <AuthScreen 
      mode="login"
      title="Hoş Geldiniz!"
      subtitle="Hesabınıza giriş yapın"
      primaryLabel="Giriş Yap"
      showSocialLogin={true}
      showForgotPassword={true}
    />
  );
}
