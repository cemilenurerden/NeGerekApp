import AuthScreen from '../../components/auth/AuthScreen';

export default function Register() {
  return (
    <AuthScreen 
      mode="register"
      title="Kayıt Ol"
      subtitle="Yeni hesap oluşturun"
      primaryLabel="Kayıt Ol"
      showSocialLogin={false}
      showForgotPassword={false}
    />
  );
}